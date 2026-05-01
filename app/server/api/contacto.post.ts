import { google } from "googleapis"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const {
      nombre,
      correo,
      telefono,
      direccion,
      descripcion,
      tecnologia
    } = body

    // Validación
    if (!nombre || !correo || !telefono || !direccion || !descripcion || !tecnologia) {
      return {
        ok: false,
        message: "Faltan datos"
      }
    }

    // Verificar variables
    if (
      !process.env.GOOGLE_CLIENT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      throw new Error("Faltan variables de entorno")
    }

    // Auth Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Enviar a Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "FORMULARIO!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [nombre, correo, telefono, direccion, descripcion, tecnologia]
        ],
      },
    })

    return {
      ok: true,
      message: "Guardado correctamente"
    }

  } catch (error: any) {
    console.error("ERROR:", error)

    return {
      ok: false,
      message: "Error al guardar",
      error: error.message
    }
  }
})