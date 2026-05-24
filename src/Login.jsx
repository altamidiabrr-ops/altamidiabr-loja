import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export default function Login({ onLoginSuccess = () => {} }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function validar() {
    if (!email.includes("@")) {
      setMensagem("Digite um e-mail válido.");
      return false;
    }

    if (senha.length < 6) {
      setMensagem("A senha precisa ter pelo menos 6 caracteres.");
      return false;
    }

    return true;
  }

  async function loginGoogle() {
    try {
      setMensagem("");
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (error) {
  console.log(error);

  if (error.code === "auth/email-already-in-use") {
    setMensagem("Essa conta já existe. Clique em Já tenho conta para entrar.");
    return;
  }

  setMensagem("Erro ao criar conta. Verifique os dados e tente novamente.");
}
  }

  async function loginEmail() {
    try {
      setMensagem("");

      if (!validar()) return;

      await signInWithEmailAndPassword(auth, email, senha);
      onLoginSuccess();
    } catch (error) {
      console.log(error);

      if (
        error.code === "auth/user-not-found" ||
        error.message.includes("user-not-found")
      ) {
        setMensagem("Esse e-mail não está cadastrado. Clique em Criar conta.");
        return;
      }

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setMensagem("E-mail ou senha incorretos. Verifique os dados e tente novamente.");
        return;
      }

      setMensagem("Erro ao entrar. Verifique os dados.");
    }
  }

  async function criarConta() {
    try {
      setMensagem("");

      if (!validar()) return;

      if (senha !== confirmarSenha) {
        setMensagem("As senhas não são iguais.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem("Conta criada com sucesso!");
      onLoginSuccess();
    } catch (error) {
      console.log(error);
      setMensagem("Erro ao criar conta. Talvez esse e-mail já esteja cadastrado.");
    }
  }

  async function sair() {
    await signOut(auth);
    setMensagem("Você saiu da conta.");
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {mensagem && (
        <div className="bg-purple-600/20 border border-purple-500/40 text-purple-200 rounded-xl p-3 text-sm font-bold text-center">
          {mensagem}
        </div>
      )}

      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-green-500"
      />
<div className="relative">

  <input
    type={mostrarSenha ? "text" : "password"}
    placeholder="Sua senha"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    className="bg-black border border-white/10 rounded-xl p-4 pr-14 w-full outline-none focus:border-green-500"
  />

  <button
    type="button"
    onClick={() => setMostrarSenha(!mostrarSenha)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
   {mostrarSenha ? "Ocultar" : "Mostrar"}
  </button>

</div>

      {modoCadastro && (
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-green-500"
        />
      )}

      {!modoCadastro ? (
        <>
          <button onClick={loginEmail} className="bg-green-600 hover:bg-green-500 py-3 rounded-xl font-black">
            Entrar
          </button>

          <button onClick={() => setModoCadastro(true)} className="bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-black">
            Criar conta
          </button>
        </>
      ) : (
        <>
          <button onClick={criarConta} className="bg-green-600 hover:bg-green-500 py-3 rounded-xl font-black">
            Finalizar cadastro
          </button>

          <button onClick={() => setModoCadastro(false)} className="border border-white/20 py-3 rounded-xl font-black">
            Já tenho conta
          </button>
        </>
      )}

      <button onClick={loginGoogle} className="bg-white text-black py-3 rounded-xl font-black flex items-center justify-center gap-3">
        <span className="text-xl">G</span>
        Entrar com Google
      </button>

      <button onClick={sair} className="bg-red-600 hover:bg-red-500 py-3 rounded-xl font-black">
        Sair
      </button>
    </div>
  );
}