import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Login from "./Login";

export default function ProdutoGrupos({
  user,
  loginOpen,
  setLoginOpen,
  onComprar,
  jaComprou,
  checkoutProduct,
  setCheckoutProduct,
  pixData,
  checkoutError,
  customer,
  setCustomer,
  gerarPix,
  loadingPix,
}) {
  const [avisoCarrinho, setAvisoCarrinho] = useState("");
  const [avisoPix, setAvisoPix] = useState("");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <a href="/" className="inline-flex items-center gap-2 mb-6 text-green-400 font-bold">
          <ArrowLeft size={20} />
          Voltar para loja
        </a>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src="/produtos/grupos-2000.png"
              className="w-full rounded-3xl border border-green-500/30"
              alt="+2000 Grupos de Divulgação"
            />
            <div className="mt-6">
  <p className="text-2xl font-black text-green-400 mb-4">
    Veja os grupos funcionando
  </p>

  <video
    controls
    playsInline
    className="w-full rounded-3xl border border-green-500/20 bg-black"
  >
    <source src="/videos/grupos-divulgacao.mp4" type="video/mp4" />
  </video>
</div>
          </div>

          <div>
            <span className="bg-green-600 px-4 py-2 rounded-xl font-black inline-block mb-4">
              POPULAR
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              +2000 Grupos de Divulgação
            </h1>

            <p className="text-2xl text-green-400 font-black mt-6">R$ 12,50</p>

            <div className="mt-6 space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                Receba uma seleção com mais de 2000 grupos para divulgar seus produtos,
                serviços, links, lojas, perfis e oportunidades.
              </p>

              <p>
                É ideal para quem trabalha com marketing digital, vendas online,
                divulgação no WhatsApp, afiliados, serviços e renda extra.
              </p>

              <p>
                Você pode usar os grupos para divulgar manualmente ou junto com o Robô Divulgador WhatsApp.
              </p>

              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
                <p className="font-black text-green-400 mb-2">🚀 Alcance mais pessoas</p>
                <p>
                  Quanto mais grupos você tiver, maior pode ser o alcance das suas divulgações.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Mais de 2000 grupos de divulgação</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Arquivo TXT com grupos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Planilhas com grupos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Link extra com mais grupos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Entrega automática após compra</div>
            </div>

            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-5">
              <p className="font-black text-green-400 mb-2">📦 Como recebo?</p>
              <p className="text-gray-300">
                Após a aprovação do pagamento, os arquivos e links dos grupos ficarão disponíveis automaticamente na área “Minhas Compras”.
              </p>
            </div>

            {avisoCarrinho && (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-300 font-bold">
                  {avisoCarrinho}
                </div>

                <a
                  href="/"
                  className="w-full flex items-center justify-center bg-white text-black font-black py-4 rounded-2xl hover:bg-green-400 transition"
                >
                  Voltar para loja
                </a>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={onComprar}
                className="flex-1 bg-green-600 hover:bg-green-500 transition py-4 rounded-2xl font-black text-lg"
              >
                {jaComprou ? "Acessar produto comprado" : "Comprar agora"}
              </button>

              <button
                onClick={() => {
                  if (!user) {
                    setLoginOpen(true);
                    return;
                  }

                  const produtoGrupos = {
                    name: "+2000 Grupos de Divulgação",
                    price: "R$ 12,50",
                    image: "/produtos/grupos-2000.png",
                    tag: "Popular",
                    discount: "37%",
                  };

                  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

                  const jaTem = carrinhoAtual.some(
                    (item) => item.name === produtoGrupos.name
                  );

                  if (!jaTem) {
                    localStorage.setItem(
                      "carrinho",
                      JSON.stringify([...carrinhoAtual, produtoGrupos])
                    );
                  }

                  setAvisoCarrinho("✅ Grupos adicionados ao carrinho! Volte para a loja e abra o carrinho quando quiser finalizar.");
                }}
                className="h-16 sm:w-16 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-green-400 transition"
              >
                <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loginOpen && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-purple-500/40 bg-[#0f0f12] p-6 relative">
            <button onClick={() => setLoginOpen(false)} className="absolute top-4 right-5 text-3xl font-black">
              ×
            </button>

            <h2 className="text-3xl font-black text-center mb-2">Entrar na conta</h2>

            <p className="text-gray-400 text-center mb-6">
              Faça login para comprar ou adicionar ao carrinho.
            </p>

            <Login onLoginSuccess={() => setLoginOpen(false)} />
          </div>
        </div>
      )}

      {checkoutProduct && checkoutProduct.name === "+2000 Grupos de Divulgação" && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 bg-[#0b0b0d] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Finalizar compra</h2>
              <button onClick={() => setCheckoutProduct(null)} className="text-3xl">×</button>
            </div>

            <p className="text-green-400 font-black text-xl mb-4">
              +2000 Grupos de Divulgação — R$ 12,50
            </p>

            <div className="space-y-4">
              <input type="text" placeholder="Seu nome" value={customer.nome} onChange={(e) => setCustomer({ ...customer, nome: e.target.value })} className="w-full bg-black border border-white/10 rounded-2xl p-4" />
              <input type="text" placeholder="Seu WhatsApp" value={customer.whatsapp} onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })} className="w-full bg-black border border-white/10 rounded-2xl p-4" />
              <input type="email" placeholder="Seu e-mail" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="w-full bg-black border border-white/10 rounded-2xl p-4" />

              {checkoutError && (
                <div className="rounded-xl border border-red-500/40 bg-red-600/20 p-3 text-center text-sm font-bold text-red-200">
                  {checkoutError}
                </div>
              )}

              <button onClick={() => {
  setAvisoPix("");
  gerarPix();
}} disabled={loadingPix} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black text-lg">
                {loadingPix ? "Gerando PIX..." : pixData?.qr_code ? "PIX já gerado" : "Gerar PIX"}
              </button>

              {pixData?.qr_code && (
                <div className="mt-5 rounded-2xl border border-green-500/30 bg-black p-4">
                  <p className="text-green-400 font-black mb-3">PIX gerado com sucesso</p>
                  <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} className="w-48 h-48 mx-auto rounded-xl bg-white p-2" />
                  <textarea value={pixData.qr_code} readOnly className="mt-4 w-full h-28 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-gray-300" />
                  <button
  className="mt-3 w-full rounded-xl bg-green-600 hover:bg-green-500 py-3 font-black text-white transition"
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(pixData.qr_code);
      setAvisoPix("✅ Código PIX copiado com sucesso!");
    } catch (error) {
      setAvisoPix("⚠️ Não foi possível copiar o PIX.");
    }
  }}
>
  Copiar código PIX
</button>
{avisoPix && (
  <div className="mt-3 rounded-xl border border-green-500/40 bg-green-500/10 p-3 text-center font-bold text-green-300">
    {avisoPix}
  </div>
)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}