import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Login from "./Login";

export default function CursoProgama({
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

        <a
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-green-400 font-bold"
        >
          <ArrowLeft size={20} />
          Voltar para loja
        </a>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          <div>

            <img
              src="/produtos/cursoprogama.png"
              className="w-full rounded-3xl border border-green-500/30"
            />

            <div className="mt-5">
              <img
                src="/produtos/cursoprogama2.png"
                className="w-full rounded-3xl border border-white/10"
              />
            </div>

          </div>

          <div>

            <span className="bg-green-600 px-4 py-2 rounded-xl font-black inline-block mb-4">
              CURSO COMPLETO
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Curso Completo de Programação
            </h1>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-2xl text-gray-500 line-through font-black">
                R$ 120,00
              </span>

              <span className="bg-green-600 text-white px-3 py-1 rounded-xl font-black">
                ↓ 51%
              </span>
            </div>

            <p className="text-5xl text-green-400 font-black mt-2">
              R$ 59,00
            </p>

            <div className="mt-6 space-y-5 text-gray-300 text-lg leading-relaxed">

              <p>
                Quer aprender programação do ZERO e entrar em uma das áreas que mais cresce no mundo?
              </p>

              <p>
                Curso completo com mais de 500 aulas ensinando tudo passo a passo.
              </p>

              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5">

                <p className="font-black text-green-400 mb-2">
                  🚀 O que você vai aprender
                </p>

                <div className="space-y-2">

                  <p>✅ Python</p>
                  <p>✅ JavaScript</p>
                  <p>✅ React</p>
                  <p>✅ Node.js</p>
                  <p>✅ APIs</p>
                  <p>✅ Java</p>
                  <p>✅ Angular</p>
                  <p>✅ Flutter</p>
                  <p>✅ AWS</p>
                  <p>✅ E MUITO MAIS</p>

                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                ✅ +500 aulas completas
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                ✅ Projetos reais
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                ✅ Certificado incluso
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                ✅ Acesso vitalício
              </div>

            </div>

            <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-500/10 p-5">

              <p className="font-black text-green-400 mb-2">
                📦 Como recebo?
              </p>

              <p className="text-gray-300">
                Após o pagamento aprovado, o acesso ficará disponível automaticamente na área “Minhas Compras”.
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

                  const produtoCurso = {
                    name: "Curso Completo de Programação",
                    price: "R$ 59,00",
                    image: "/produtos/cursoprogama.png",
                    tag: "CURSO",
                    discount: "51%",
                  };

                  const carrinhoAtual =
                    JSON.parse(localStorage.getItem("carrinho")) || [];

                  const jaTem = carrinhoAtual.some(
                    (item) => item.name === produtoCurso.name
                  );

                  if (!jaTem) {
                    localStorage.setItem(
                      "carrinho",
                      JSON.stringify([...carrinhoAtual, produtoCurso])
                    );
                  }

                  setAvisoCarrinho(
                    "✅ Curso adicionado ao carrinho!"
                  );
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

            <Login onLoginSuccess={() => setLoginOpen(false)} />

          </div>

        </div>
      )}

      {checkoutProduct &&
        checkoutProduct.name === "Curso Completo de Programação" && (

        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 bg-[#0b0b0d] p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                Finalizar compra
              </h2>

              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-3xl"
              >
                ×
              </button>

            </div>

            <p className="text-green-400 font-black text-xl mb-4">
              Curso Completo de Programação — R$ 59,00
            </p>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Seu nome"
                value={customer.nome}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    nome: e.target.value,
                  })
                }
                className="w-full bg-black border border-white/10 rounded-2xl p-4"
              />

              <input
                type="text"
                placeholder="Seu WhatsApp"
                value={customer.whatsapp}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    whatsapp: e.target.value,
                  })
                }
                className="w-full bg-black border border-white/10 rounded-2xl p-4"
              />

              <input
                type="email"
                placeholder="Seu e-mail"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    email: e.target.value,
                  })
                }
                className="w-full bg-black border border-white/10 rounded-2xl p-4"
              />

              <button
                onClick={() => {
                  setAvisoPix("");
                  gerarPix();
                }}
                disabled={loadingPix}
                className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black text-lg"
              >
                {loadingPix
                  ? "Gerando PIX..."
                  : pixData?.qr_code
                  ? "PIX já gerado"
                  : "Gerar PIX"}
              </button>

              {pixData?.qr_code && (

                <div className="mt-5 rounded-2xl border border-green-500/30 bg-black p-4">

                  <p className="text-green-400 font-black mb-3">
                    PIX gerado com sucesso
                  </p>

                  <img
                    src={`data:image/jpeg;base64,${pixData.qr_code_base64}`}
                    className="w-48 h-48 mx-auto rounded-xl bg-white p-2"
                  />

                  <textarea
                    value={pixData.qr_code}
                    readOnly
                    className="mt-4 w-full h-28 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-gray-300"
                  />

                  <button
                    className="mt-3 w-full rounded-xl bg-green-600 hover:bg-green-500 py-3 font-black text-white transition"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          pixData.qr_code
                        );

                        setAvisoPix(
                          "✅ Código PIX copiado com sucesso!"
                        );

                      } catch (error) {

                        setAvisoPix(
                          "⚠️ Não foi possível copiar o PIX."
                        );

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