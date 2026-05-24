import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Login from "./Login";

export default function ProdutoCombo({
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
  user,
loginOpen,
setLoginOpen,
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
              src="/produtos/combo-divulgacao.png"
              className="w-full rounded-3xl border border-green-500/30"
              alt="Combo Divulgação"
            />
            <div className="mt-5 flex justify-center">
  <div>

    <p className="text-center text-green-400 font-black mb-3">
      Funcionamento dos grupos com o robô
    </p>

    <video
      controls
      playsInline
      className="w-full max-w-[280px] aspect-[9/16] rounded-3xl border border-white/10 bg-black object-cover"
    >
      <source
        src="/videos/robo-funcionando.mp4"
        type="video/mp4"
      />
    </video>

  </div>
</div>
          </div>

          <div>
            <span className="bg-purple-600 px-4 py-2 rounded-xl font-black inline-block mb-4">
              COMBO COMPLETO
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Combo Divulgação
            </h1>

            <p className="text-2xl text-green-400 font-black mt-6">R$ 20,00</p>

            <div className="mt-6 space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                O Combo Divulgação junta o Robô Divulgador WhatsApp com materiais prontos para você começar a divulgar.
              </p>

              <p>
                É ideal para quem quer divulgar produtos, serviços, links, grupos, lojas ou trabalhar com marketing digital.
              </p>

              <p>
                Você recebe o robô, arquivos de grupos, planilhas, grupos extras e tutoriais para usar tudo com mais facilidade.
              </p>

              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
                <p className="font-black text-green-400 mb-2">🚀 Melhor custo-benefício</p>
                <p>
  Combo completo ideal para automatizar suas divulgações e alcançar milhares de pessoas todos os dias.
</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Robô Divulgador WhatsApp incluso</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Arquivo TXT com grupos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Planilhas de grupos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Grupos extras inclusos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">✅ Tutoriais inclusos após compra</div>
            </div>

            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-5">
              <p className="font-black text-green-400 mb-2">📦 Como recebo?</p>
              <p className="text-gray-300">
                Após a aprovação do pagamento, o combo ficará disponível automaticamente na área “Minhas Compras”.
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
                  const produtoCombo = {
                    name: "Combo Divulgação",
                    price: "R$ 20,00",
                    image: "/produtos/combo-divulgacao.png",
                    tag: "COMBO",
                    discount: "43%",
                  };

                  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

                  const jaTem = carrinhoAtual.some(
                    (item) => item.name === produtoCombo.name
                  );

                  if (!jaTem) {
                    localStorage.setItem(
                      "carrinho",
                      JSON.stringify([...carrinhoAtual, produtoCombo])
                    );
                  }

                  setAvisoCarrinho("✅ Combo adicionado ao carrinho! Volte para a loja e abra o carrinho quando quiser finalizar.");
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
      <button
        onClick={() => setLoginOpen(false)}
        className="absolute top-4 right-5 text-3xl font-black"
      >
        ×
      </button>

      <h2 className="text-3xl font-black text-center mb-2">
        Entrar na conta
      </h2>

      <p className="text-gray-400 text-center mb-6">
        Faça login para comprar ou adicionar ao carrinho.
      </p>

      <Login onLoginSuccess={() => setLoginOpen(false)} />
    </div>
  </div>
)}
      {checkoutProduct && checkoutProduct.name === "Combo Divulgação" && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 bg-[#0b0b0d] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Finalizar compra</h2>
              <button onClick={() => setCheckoutProduct(null)} className="text-3xl">×</button>
            </div>

            <p className="text-green-400 font-black text-xl mb-4">Combo Divulgação — R$ 20,00</p>

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