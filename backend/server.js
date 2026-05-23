require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Payment } = require("mercadopago");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const payment = new Payment(client);

app.get("/", (req, res) => {
  res.send("Backend Mercado Pago funcionando");
});

app.post("/criar-pix", async (req, res) => {
  try {
    const body = {
      transaction_amount: Number(req.body.valor),
description: req.body.produto,
      payment_method_id: "pix",
      payer: {
        email: "cliente@email.com",
      },
    };

    const result = await payment.create({ body });

    res.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        result.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      erro: "Erro ao gerar PIX",
      detalhe: error.message,
    });
  }
});
app.get("/pagamento/:id", async (req, res) => {
  try {
    const result = await payment.get({
      id: Number(req.params.id),
    });

    res.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch (error) {
    console.log("Erro ao consultar:", error);

    res.status(500).json({
      erro: "Erro ao consultar pagamento",
      detalhe: error.message,
    });
  }
});
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});