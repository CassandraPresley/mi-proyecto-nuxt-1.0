import { google } from "googleapis"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { nombre, correo, telefono, proyecto } = body

  if (!nombre || !correo || !telefono || !proyecto) {
    return { status: 400, message: "Faltan datos" }
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const sheets = google.sheets({ version: "v4", auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "FORMULARIO!A:D", // 🔥 AQUÍ EL CAMBIO
    valueInputOption: "RAW",
    requestBody: {
      values: [[nombre, correo, telefono, proyecto]],
    },
  })

  return { status: 200, message: "Guardado correctamente" }
})