import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Login from "./Login";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  ShoppingCart,
  Menu,
  Zap,
  ShieldCheck,
  Headphones,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  X,
} from "lucide-react";

const products = [
  {
    name: "Robô Divulgador WhatsApp",
    price: "R$ 15,00",
    oldPrice: "R$ 25,00",
    image: "/produtos/robo-whatsapp.jpeg",
    tag: "Mais vendido",
    discount: "40%",
  },
  {
    name: "+2000 Grupos de Divulgação",
    price: "R$ 12,50",
    oldPrice: "R$ 20,00",
    image: "/produtos/grupos-2000.png",
    tag: "Popular",
    discount: "37%",
  },
  {
    name: "Painel SMM",
    price: "R$ 25,00",
    oldPrice: "R$ 40,00",
    image: "/produtos/painel-smm.png",
    tag: "PAINEL",
    discount: "38%",
  },
  {
    name: "Combo Divulgação",
    price: "R$ 20,00",
    oldPrice: "R$ 35,00",
    image: "/produtos/combo-divulgacao.png",
    tag: "COMBO",
    discount: "43%",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [meusProdutos, setMeusProdutos] = useState([]);
  const [comprasOpen, setComprasOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
const [carrinho, setCarrinho] = useState([]);

function valorNumero(preco) {
  return Number(preco.replace("R$", "").replace(".", "").replace(",", ".").trim());
}

function valorReal(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

const totalCarrinho = carrinho.reduce((total, item) => total + valorNumero(item.price), 0);

function adicionarCarrinho(produto) {
  if (!user) {
    setLoginOpen(true);
    return;
  }

  const jaTem = carrinho.some((item) => item.name === produto.name);

  if (!jaTem) {
    setCarrinho([...carrinho, produto]);
  }

  setCartOpen(true);
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser?.email) {
  setCustomer((prev) => ({
    ...prev,
    email: currentUser.email,
  }));

  async function carregarCompras() {
    const userRef = doc(db, "usuarios", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setMeusProdutos(userSnap.data().produtos || []);
    } else {
      setMeusProdutos([]);
    }
  }

  carregarCompras();

} else {
  setMeusProdutos([]);
}
  });

  return () => unsubscribe();
}, []);
const [checkoutProduct, setCheckoutProduct] = useState(null);
const [pixData, setPixData] = useState(null);
const [checkoutError, setCheckoutError] = useState("");
const [customer, setCustomer] = useState({
  nome: "",
  whatsapp: "",
  email: user?.email || "",
});
async function gerarPix() {
  try {
    const nomeValido = customer.nome.trim().length >= 6;
const whatsappValido = /^\d{10,11}$/.test(customer.whatsapp.replace(/\D/g, ""));
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);

if (!nomeValido) {
  setCheckoutError("Digite seu nome completo.");
  return;
}

if (!whatsappValido) {
  setCheckoutError("Digite um WhatsApp válido com DDD, somente números.");
  return;
}

if (!emailValido) {
setCheckoutError("Digite um e-mail válido.");
  return;
}
async function verificarPagamento(paymentId) {
  const interval = setInterval(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/pagamento/${paymentId}`
      );

      const data = await response.json();

      console.log("STATUS DO PAGAMENTO:", data);

      if (data.status === "approved") {
        await setDoc(doc(db, "usuarios", user.uid), {
          email: user.email,
          produtos: arrayUnion(
  ...(checkoutProduct.items
    ? checkoutProduct.items.map((item) => ({
        nome: item.name,
        imagem: item.image,
        data: new Date().toISOString(),
      }))
    : [
        {
          nome: checkoutProduct.name,
          imagem: checkoutProduct.image,
          data: new Date().toISOString(),
        },
      ])
),
        }, { merge: true });

        clearInterval(interval);

        setPixData({
          aprovado: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, 5000);
}

const valor = Number(
      checkoutProduct.price
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim()
    );

    const response = await fetch("http://localhost:3000/criar-pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        produto: checkoutProduct.name,
        valor: valor,
      }),
    });

    const data = await response.json();
    setPixData(data);
    verificarPagamento(data.id);
  } catch (error) {
    alert("Erro ao gerar PIX. Verifique se o backend está rodando.");
  }
}
  return (
    <div id="topo" className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(147,51,234,0.18),transparent_30%)] pointer-events-none" />

      <header className="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 flex items-center justify-center">
            <img
              src="/produtos/logo-altamidia.png"
              className="h-14 w-14 object-contain"
              alt="AltaMidiaBR"
            />
          </div>

          <div>
            <h1 className="text-3xl font-black">
              Alta<span className="text-purple-500">MidiaBR</span>
            </h1>
            <p className="text-xs text-gray-400 uppercase">
              Automações e ferramentas digitais
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-semibold">
          <a href="#topo">Início</a>
          <a href="#produtos">Produtos</a>
          <a href="#">Planos</a>
          <a href="https://wa.me/5543996103939" target="_blank">Suporte</a>
          <a href="https://wa.me/5543996103939" target="_blank">Contato</a>
        </nav>

        <div className="flex items-center gap-4">
        <button
  onClick={() => setCartOpen(true)}
  className="relative"
>
  <ShoppingCart className="text-purple-400" />

  {carrinho.length > 0 && (
    <span className="absolute -top-3 -right-3 h-5 w-5 rounded-full bg-green-500 text-black text-xs font-black flex items-center justify-center">
      {carrinho.length}
    </span>
  )}
</button>
      {user ? (
  <div className="hidden md:flex items-center gap-3 relative">

    <button
      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
      className="h-11 w-11 rounded-full bg-purple-600 flex items-center justify-center font-black"
    >
      {user.email?.charAt(0).toUpperCase()}
    </button>

    {profileMenuOpen && (
      <div className="absolute right-0 top-14 w-56 rounded-2xl border border-purple-500/30 bg-black/95 p-3 shadow-[0_0_30px_rgba(168,85,247,.35)] z-50">

        <a href="#topo" className="block px-4 py-3 rounded-xl hover:bg-white/10">
          Início
        </a>

        <a href="#produtos" className="block px-4 py-3 rounded-xl hover:bg-white/10">
          Produtos
        </a>

        <button
          onClick={() => {
            setComprasOpen(true);
            setProfileMenuOpen(false);
          }}
          className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10"
        >
          Minhas Compras
        </button>

        <button
          onClick={() => signOut(auth)}
          className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-red-400"
        >
          Sair
        </button>

      </div>
    )}
  </div>
) : (
  <button
    onClick={() => setLoginOpen(true)}
    className="hidden md:block px-6 py-3 rounded-xl border border-purple-500 hover:bg-purple-600 transition"
  >
    Entrar
  </button>
)}
  <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-white"
>
          
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>
      {loginOpen && (
  <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-md rounded-3xl border border-purple-500/40 bg-[#0f0f12] p-6 relative shadow-[0_0_50px_rgba(168,85,247,.35)]">
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
        Acesse para ver seus produtos comprados.
      </p>

      <Login onLoginSuccess={() => setLoginOpen(false)} />
    </div>
  </div>
)}
{cartOpen && (
  <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 bg-[#0b0b0d] p-6 shadow-[0_0_50px_rgba(34,197,94,.25)]">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black">
          🛒 Meu Carrinho
        </h2>

        <button
          onClick={() => setCartOpen(false)}
          className="h-11 w-11 rounded-full bg-white/10 hover:bg-red-500 transition flex items-center justify-center text-2xl font-black"
        >
          ✕
        </button>
      </div>

      {carrinho.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {carrinho.map((produto, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-white/10 rounded-2xl p-4 bg-black"
              >
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-black">
                    {produto.name}
                  </h3>

                  <p className="text-green-400 font-bold">
                    {produto.price}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCarrinho(
                      carrinho.filter((_, i) => i !== index)
                    )
                  }
                  className="bg-red-600 hover:bg-red-500 h-10 w-10 rounded-xl font-black"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between text-2xl font-black mb-5">
              <span>Total:</span>

              <span className="text-green-400">
                {valorReal(totalCarrinho)}
              </span>
            </div>

            <button
  onClick={() => {
    setCheckoutProduct({
      name: "Compra no Carrinho",
      price: valorReal(totalCarrinho),
      image: carrinho[0].image,
      items: carrinho,
    });

    setPixData(null);
    setCartOpen(false);
  }}
  className="w-full bg-green-600 hover:bg-green-500 transition py-4 rounded-2xl font-black text-lg"
>
  Finalizar compra
</button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Após a compra os produtos ficarão salvos em Minhas Compras.
            </p>
          </div>
        </>
      )}

    </div>
  </div>
)}
{comprasOpen && (
  <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-500/40 bg-[#0b0b0d] p-6 shadow-[0_0_50px_rgba(168,85,247,.35)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black">📦 Minhas Compras</h2>

        <button
  onClick={() => setComprasOpen(false)}
  className="h-11 w-11 rounded-full bg-white/10 hover:bg-red-500 transition flex items-center justify-center text-2xl font-black"
>
  ✕
</button>
      </div>

      {meusProdutos.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          Você ainda não comprou nenhum produto.
        </p>
      ) : (
        <div className="space-y-5">
          {meusProdutos.map((produto, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-black p-4"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-44 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-black mb-2">{produto.nome}</h3>

              <p className="text-green-400 font-bold mb-4">
                ✅ Produto liberado na sua conta
              </p>

              {produto.nome === "+2000 Grupos de Divulgação" && (
                <div className="flex flex-col gap-3">
                  <a href="/entregas/grupos-manual.txt" target="_blank" className="bg-white text-black py-3 rounded-xl text-center font-black">
                    📄 Abrir arquivo TXT
                  </a>

                  <a href="/entregas/grupos-planilha-1.xlsx" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📊 Abrir planilha 1
                  </a>

                  <a href="/entregas/grupos-planilha-2.xlsx" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📊 Abrir planilha 2
                  </a>

                  <a href="https://share.google/Bgx8r5SnLjVQcGXkk" target="_blank" className="bg-purple-600 py-3 rounded-xl text-center font-black">
                    🔗 Abrir grupos extras
                  </a>
                </div>
              )}

              {produto.nome === "Robô Divulgador WhatsApp" && (
                <div className="flex flex-col gap-3">
                  <a href="/entregas/robo-whatsapp.apk" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📥 Baixar Robô WhatsApp APK
                  </a>

                  <a href="https://youtube.com/shorts/LbnrfQNp0EM?si=YeREAgaPqHSzbJWK" target="_blank" className="bg-purple-600 py-3 rounded-xl text-center font-black">
                    🎥 Tutorial se bloquear
                  </a>

                  <a href="https://youtu.be/r25lxeJaDUE?si=YzfzAnz6hy9vaZw3" target="_blank" className="bg-purple-600 py-3 rounded-xl text-center font-black">
                    🎥 Tutorial de como usar
                  </a>
                </div>
              )}

              {produto.nome === "Painel SMM" && (
                <a href="https://garanteseguidores.com/" target="_blank" className="block bg-pink-600 py-3 rounded-xl text-center font-black">
                  🚀 Acessar Painel SMM
                </a>
              )}

              {produto.nome === "Combo Divulgação" && (
                <div className="flex flex-col gap-3">
                  <a href="/entregas/robo-whatsapp.apk" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📥 Baixar Robô WhatsApp APK
                  </a>

                  <a href="/entregas/grupos-manual.txt" target="_blank" className="bg-white text-black py-3 rounded-xl text-center font-black">
                    📄 Abrir TXT dos grupos
                  </a>

                  <a href="/entregas/grupos-planilha-1.xlsx" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📊 Abrir planilha 1
                  </a>

                  <a href="/entregas/grupos-planilha-2.xlsx" target="_blank" className="bg-green-600 py-3 rounded-xl text-center font-black">
                    📊 Abrir planilha 2
                  </a>

                  <a href="https://share.google/Bgx8r5SnLjVQcGXkk" target="_blank" className="bg-purple-600 py-3 rounded-xl text-center font-black">
                    🔗 Abrir grupos extras
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}
      {menuOpen && (
        <div className="md:hidden relative z-30 px-6 py-4 border-b border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="flex flex-col gap-4 text-lg font-bold">
            <a href="#topo" onClick={() => setMenuOpen(false)}>Início</a>
            <a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a>
            <a href="https://wa.me/5543996103939" target="_blank">Suporte</a>
            <a href="https://wa.me/5543996103939" target="_blank">Contato</a>
            {user ? (
  <>
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center font-black">
        {user.email?.charAt(0).toUpperCase()}
      </div>

      <div>
        <p className="font-black">Minha conta</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
    </div>

    <button className="bg-white/10 py-3 rounded-xl text-left px-4">
      🛒 Carrinho
    </button>

    <button
  onClick={() => {
    setComprasOpen(true);
    setMenuOpen(false);
  }}
  className="bg-white/10 py-3 rounded-xl text-left px-4"
>
  📦 Minhas compras
</button>

    <button
      onClick={() => {
        signOut(auth);
        setMenuOpen(false);
      }}
      className="bg-red-600 hover:bg-red-500 py-3 rounded-xl"
    >
      Sair
    </button>
  </>
) : (
  <button
    onClick={() => {
      setLoginOpen(true);
      setMenuOpen(false);
    }}
    className="mt-2 bg-green-600 hover:bg-green-500 py-3 rounded-xl"
  >
    Entrar / Criar conta
  </button>
)}
          </div>
        </div>
      )}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <section className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/50 bg-green-500/10 text-green-400 font-bold mb-6">
              <Zap size={16} />
              AUTOMAÇÃO 24H
            </div>

            <h2 className="text-4xl md:text-7xl font-black leading-tight">
              VENDA NO <br />
              <span className="text-lime-400 drop-shadow-[0_0_25px_rgba(132,204,22,.8)]">
                AUTOMÁTICO
              </span>
            </h2>

            <p className="text-gray-300 text-xl mt-6 max-w-xl">
              Ferramentas, robôs e automações para WhatsApp, Telegram e marketing digital.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <MiniCard icon={<MessageCircle />} title="Atendimento" text="Automático" />
              <MiniCard icon={<Users />} title="Divulgação" text="Em massa" />
              <MiniCard icon={<Clock />} title="Funciona" text="24h por dia" />
              <MiniCard icon={<TrendingUp />} title="Aumente" text="Suas vendas" />
            </div>

            <a href="#produtos">
              <button className="mt-8 px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-500 font-black shadow-[0_0_35px_rgba(34,197,94,.6)] transition">
                VER PRODUTOS →
              </button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <div className="rounded-[32px] border border-green-500/30 bg-black/50 p-8 shadow-[0_0_60px_rgba(34,197,94,.25)]">
              <img
                src="/produtos/logo-altamidia.png"
                className="w-full max-h-[420px] rounded-[32px] object-contain"
                alt="AltaMidiaBR"
              />
            </div>
          </motion.div>
        </section>

        <section className="grid md:grid-cols-4 gap-4 mb-16">
          <Benefit icon={<Zap />} title="Funciona 24h" text="Sem parar um segundo" />
          <Benefit icon={<Users />} title="Alcance milhares" text="Divulgue todos os dias" />
          <Benefit icon={<ShieldCheck />} title="Pagamento seguro" text="Ambiente protegido" />
          <Benefit icon={<Headphones />} title="Suporte dedicado" text="Atendimento rápido" />
        </section>

        <section id="produtos" className="pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <h2 className="text-4xl font-black">Produtos em destaque</h2>
            <button className="px-5 py-3 rounded-xl bg-purple-600/30 border border-purple-500">
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-7">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(34,197,94,.35)",
                }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0b0b0d] hover:border-green-400/70 transition-all duration-500"
              >
                <div className="relative bg-black">
                  <img
                    src={p.image}
                    className="h-32 md:h-64 w-full object-cover object-top bg-black"
                    alt={p.name}
                  />
                  <span className="absolute top-2 left-2 bg-green-600 px-3 py-1 rounded-lg text-[10px] md:text-xs font-black uppercase">
                    {p.tag}
                  </span>
                </div>

                <div className="p-3 md:p-5">
                  <h3 className="text-base md:text-2xl font-semibold md:font-black mb-5 leading-tight min-h-[48px] md:min-h-[70px]">
                    {p.name}
                  </h3>

                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-sm md:text-base">
                        {p.oldPrice}
                      </span>
                      <span className="bg-green-500/20 text-green-400 text-[10px] md:text-xs px-2 py-1 rounded-lg">
                        ↓ {p.discount}
                      </span>
                    </div>

                    <strong className="block text-2xl md:text-3xl text-white mt-2">
                      {p.price}
                    </strong>

                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      À vista no PIX
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
  onClick={() => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    const jaComprou = meusProdutos.some(
      (produto) => produto.nome === p.name
    );

    if (jaComprou) {
      setComprasOpen(true);
      return;
    }

    setCheckoutProduct(p);
    setPixData(null);
  }}
  className={`flex-1 text-center px-3 py-3 rounded-xl text-sm md:text-base font-black transition-all duration-300 ${
    meusProdutos.some((produto) => produto.nome === p.name)
      ? "bg-green-600 text-white hover:bg-green-500"
      : "bg-white text-black hover:bg-green-400"
  }`}
>
  {meusProdutos.some((produto) => produto.nome === p.name)
    ? "Ver produto"
    : "Comprar"}
</button>

            <button
  onClick={() => adicionarCarrinho(p)}
  className="h-12 w-12 rounded-xl bg-white text-black flex items-center justify-center hover:bg-green-400 transition"
>
  <ShoppingCart size={20} />
</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {checkoutProduct && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 bg-[#0b0b0d] p-6 shadow-[0_0_50px_rgba(34,197,94,.25)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Finalizar compra</h2>

              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={checkoutProduct.image}
                className="h-20 w-20 rounded-2xl object-cover"
                alt={checkoutProduct.name}
              />

              <div>
                <h3 className="font-black">{checkoutProduct.name}</h3>
                <p className="text-green-400 font-black text-xl">
                  {checkoutProduct.price}
                </p>
                <p className="text-gray-400 text-sm">Pagamento via PIX</p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={customer.nome}
onChange={(e) =>
  setCustomer({ ...customer, nome: e.target.value })
}
                className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500"
              />

              <input
                type="text"
                placeholder="Seu WhatsApp"
                value={customer.whatsapp}
onChange={(e) =>
  setCustomer({ ...customer, whatsapp: e.target.value })
}
                className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500"
              />

              <input
                type="email"
                placeholder="Seu e-mail"
                value={customer.email}
onChange={(e) =>
  setCustomer({ ...customer, email: e.target.value })
}
                className="w-full bg-black border border-white/10 rounded-2xl p-4 outline-none focus:border-green-500"
              />

       {checkoutError && (
  <div className="rounded-xl border border-red-500/40 bg-red-600/20 p-3 text-center text-sm font-bold text-red-200 mb-3">
    {checkoutError}
  </div>
)}

<button
  onClick={gerarPix}
  className="w-full bg-green-600 hover:bg-green-500 transition py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(34,197,94,.5)]"
>
  Gerar PIX
</button>

{pixData && (
  <div className="mt-5 rounded-2xl border border-green-500/30 bg-black p-4">
    <p className="text-green-400 font-black mb-3">
      PIX gerado com sucesso
    </p>

    <img
      src={`data:image/jpeg;base64,${pixData.qr_code_base64}`}
      className="w-48 h-48 mx-auto rounded-xl bg-white p-2"
      alt="QR Code PIX"
    />

    <textarea
      value={pixData.qr_code}
      readOnly
      className="mt-4 w-full h-28 bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-gray-300"
    />
    <button
  onClick={() => {
    navigator.clipboard.writeText(pixData.qr_code);
setCheckoutError("✅ Código PIX copiado com sucesso!");
  }}
  className="mt-3 w-full bg-purple-600 hover:bg-purple-500 transition py-3 rounded-xl font-black"
>
  Copiar código PIX
</button>

{pixData?.aprovado && checkoutProduct?.name === "Painel SMM" && (
  <div className="mt-5 border border-pink-500/30 rounded-2xl p-4 bg-[#0f0f12]">
    <h3 className="text-2xl font-black text-green-400 mb-4">
      ✅ Painel liberado no seu perfil!
    </h3>

    <p className="text-gray-300 mb-4">
      Seu acesso ao Painel SMM foi liberado com sucesso.
      Clique no botão abaixo para acessar o painel.
    </p>

    <a
      href="https://garanteseguidores.com/"
      target="_blank"
      className="bg-pink-600 hover:bg-pink-500 rounded-xl py-4 text-center font-black block mb-3"
    >
      🚀 Acessar Painel SMM
    </a>

    <p className="text-sm text-gray-400">
      Caso tenha qualquer dúvida sobre como usar o painel, chame o suporte.
    </p>

    <a
      href="https://wa.me/5543996103939"
      target="_blank"
      className="mt-3 bg-[#25D366] text-black rounded-xl py-3 text-center font-black block"
    >
      📱 Chamar suporte
    </a>
  </div>
)}
{pixData?.aprovado && checkoutProduct?.name === "Combo Divulgação" && (
  <div className="mt-5 border border-lime-500/30 rounded-2xl p-4 bg-[#0f0f12]">
    <h3 className="text-2xl font-black text-green-400 mb-4">
      ✅ Combo Divulgação liberado!
    </h3>

    <p className="text-gray-300 mb-4">
      Seu combo foi liberado com sucesso. Acesse abaixo o robô, os grupos e os tutoriais.
    </p>

    <div className="flex flex-col gap-3">
      <a
        href="/entregas/robo-whatsapp.apk"
        target="_blank"
        className="bg-green-600 rounded-xl py-3 text-center font-black"
      >
        📥 Baixar Robô WhatsApp APK
      </a>

      <a
        href="/entregas/grupos-manual.txt"
        target="_blank"
        className="bg-white text-black rounded-xl py-3 text-center font-black"
      >
        📄 Abrir arquivo TXT dos grupos
      </a>

      <a
        href="/entregas/grupos-planilha-1.xlsx"
        target="_blank"
        className="bg-green-600 rounded-xl py-3 text-center font-black"
      >
        📊 Abrir planilha 1
      </a>
<a
  href="https://share.google/Bgx8r5SnLjVQcGXkk"
  target="_blank"
  className="bg-purple-600 rounded-xl py-3 text-center font-black"
>
  🔗 Abrir grupos extras
</a>
      <a
        href="/entregas/grupos-planilha-2.xlsx"
        target="_blank"
        className="bg-green-600 rounded-xl py-3 text-center font-black"
      >
        📊 Abrir planilha 2
      </a>

      <a
        href="https://youtube.com/shorts/LbnrfQNp0EM?si=YeREAgaPqHSzbJWK"
        target="_blank"
        className="bg-purple-600 rounded-xl py-3 text-center font-black"
      >
        🎥 Tutorial se bloquear
      </a>

      <a
        href="https://youtu.be/r25lxeJaDUE?si=YzfzAnz6hy9vaZw3"
        target="_blank"
        className="bg-purple-600 rounded-xl py-3 text-center font-black"
      >
        🎥 Tutorial de como usar
      </a>

      <p className="text-sm text-gray-300">
        📊 As planilhas precisam de leitor Excel no celular.
        <br />
        🤖 Após programar o robô, use tempo acima de 1300 segundos para uma divulgação mais segura.
      </p>
    </div>
  </div>
)}
{pixData?.aprovado && checkoutProduct?.name === "Robô Divulgador WhatsApp" && (
  <div className="mt-5 border border-purple-500/30 rounded-2xl p-4 bg-[#0f0f12]">
    <h3 className="text-2xl font-black text-green-400 mb-4">
      ✅ Acesso liberado!
    </h3>

    <p className="text-gray-300 mb-4">
      O robô foi liberado com sucesso.
    </p>

    <a
      href="/entregas/robo-whatsapp.apk"
      target="_blank"
      className="bg-green-600 rounded-xl py-4 text-center font-black block mb-3"
    >
      📥 Baixar Robô WhatsApp APK
    </a>

    <a
      href="https://youtube.com/shorts/LbnrfQNp0EM?si=YeREAgaPqHSzbJWK"
      target="_blank"
      className="bg-purple-600 rounded-xl py-3 text-center font-black block mb-3"
    >
      🎥 Tutorial se bloquear
    </a>

    <a
      href="https://youtu.be/r25lxeJaDUE?si=YzfzAnz6hy9vaZw3"
      target="_blank"
      className="bg-purple-600 rounded-xl py-3 text-center font-black block mb-3"
    >
      🎥 Tutorial de como usar
    </a>

    <p className="text-sm text-gray-300">
      Após programar o robô, use tempo acima de 1300 segundos para uma divulgação mais segura.
    </p>
  </div>
)}
{pixData.aprovado && checkoutProduct.name === "+2000 Grupos de Divulgação" && (
  <div className="mt-5 border border-green-500/30 rounded-2xl p-4 bg-[#0f0f12]">
    <h3 className="text-2xl font-black text-green-400 mb-4">
      ✅ Pagamento aprovado
    </h3>

    <p className="text-gray-300 mb-4">
      Acesse abaixo os arquivos e links do seu produto.
<br /><br />
📊 As planilhas precisam de leitor Excel no celular.
<br />
🔗 O link extra contém quase mil grupos de divulgação.
    </p>

    <div className="flex flex-col gap-3">

      <a
  href="/entregas/grupos-manual.txt"
  target="_blank"
  className="bg-white text-black rounded-xl py-3 text-center font-black"
>
  📄 Abrir arquivo TXT
</a>
      <a
  href="/entregas/grupos-planilha-1.xlsx"
  target="_blank"
  className="bg-green-600 rounded-xl py-3 text-center font-black"
>
  📊 Abrir planilha 1
</a>
      <a
  href="/entregas/grupos-planilha-2.xlsx"
  target="_blank"
  className="bg-green-600 rounded-xl py-3 text-center font-black"
>
  📊 Abrir planilha 2
</a>

      <a
        href="https://share.google/Bgx8r5SnLjVQcGXkk"
        target="_blank"
        className="bg-purple-600 rounded-xl py-3 text-center font-black"
      >
        🔗 Abrir grupos extras
      </a>

      <a
        href="https://wa.me/5543996103939"
        target="_blank"
        className="bg-[#25D366] text-black rounded-xl py-3 text-center font-black"
      >
        📱 Suporte WhatsApp
      </a>
{pixData?.aprovado && checkoutProduct.name === "Robô Divulgador WhatsApp" && (
  <div className="mt-5 border border-purple-500/30 rounded-2xl p-4 bg-[#0f0f12]">

    <h3 className="text-2xl font-black text-green-400 mb-4">
      ✅ Acesso liberado!
    </h3>

    <p className="text-gray-300 mb-4">
      O robô foi liberado com sucesso.
    </p>

    <a
      href="/entregas/robo-whatsapp.apk"
      target="_blank"
      className="bg-green-600 rounded-xl py-4 text-center font-black block mb-3"
    >
      📥 Baixar Robô WhatsApp APK
    </a>

    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-4">

      <p className="font-black text-yellow-400 mb-3">
        ⚠️ Caso dê bloqueio ou algum erro:
      </p>

      <a
        href="https://youtube.com/shorts/LbnrfQNp0EM?si=YeREAgaPqHSzbJWK"
        target="_blank"
        className="text-green-400 underline block mb-3"
      >
        🎥 Tutorial caso bloqueie
      </a>

      <a
        href="https://youtu.be/r25lxeJaDUE?si=YzfzAnz6hy9vaZw3"
        target="_blank"
        className="text-green-400 underline block"
      >
        🎥 Tutorial de como usar
      </a>

    </div>

    <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-4 mb-4">
      <p className="font-black text-purple-300 mb-2">
        📢 Recomendação importante
      </p>

      <p className="text-gray-300 text-sm leading-relaxed">
        Após programar o robô, mantenha o tempo de divulgação acima de 1300 segundos.
        <br /><br />
        Isso ajuda a deixar a divulgação mais segura e reduz riscos de limitações no WhatsApp.
      </p>
    </div>

    <a
      href="https://wa.me/5543996103939"
      target="_blank"
      className="bg-[#25D366] text-black rounded-xl py-3 text-center font-black block"
    >
      📱 Chamar suporte
    </a>

  </div>
)}
    </div>
  </div>
)}
  </div>
)}

              <p className="text-xs text-gray-500 text-center">
                O PIX real será integrado no próximo passo com Mercado Pago.
              </p>
            </div>
          </div>
        </div>
      )}

      <a
        href="https://wa.me/5543996103939"
        target="_blank"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_35px_rgba(34,197,94,.8)] animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}

function MiniCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
      <div className="text-green-400">{icon}</div>
      <div>
        <h4 className="font-black">{title}</h4>
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
      <div className="text-purple-400">{icon}</div>
      <div>
        <h4 className="font-black">{title}</h4>
        <p className="text-sm text-gray-400">{text}</p>
      </div>
      
    </div>
  );
}

export default App;