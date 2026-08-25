/**
 * MIO-Oil · Instrumento de entrevista — Backend en Google Apps Script
 *
 * INSTALACIÓN:
 * 1. Abre tu Google Sheet de respuestas.
 * 2. Extensiones → Apps Script.
 * 3. Borra el contenido de Code.gs y pega todo este archivo.
 * 4. Reemplaza FOLDER_ID abajo con el ID de tu carpeta de Drive para audios.
 * 5. Guarda. Implementar → Nueva implementación → Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 6. Copia la URL que termina en /exec y pégala en js/config.js del sitio.
 * 7. La primera vez que pruebes el script, Google pedirá autorizar permisos
 *    de Sheets y Drive: acepta con tu cuenta.
 */

const FOLDER_ID = '1oyP-HDmu9lt87nH9QznE832Kdv9zI_LB';
const NOMBRE_HOJA = 'Respuestas'; // cambia si tu pestaña se llama distinto

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(NOMBRE_HOJA);
    if (!sheet) {
      sheet = ss.insertSheet(NOMBRE_HOJA);
      sheet.appendRow([
        'Timestamp', 'SessionId', 'Nombre', 'Cargo', 'Departamento',
        'Entrevistador', 'Fecha', '#Pregunta', 'Pregunta',
        'Respuesta (texto)', 'Audio (enlace)'
      ]);
    }

    let audioUrl = '';
    if (data.audioBase64) {
      audioUrl = guardarAudio(data.audioBase64, data.sessionId, data.numPregunta);
    }

    sheet.appendRow([
      new Date(),
      data.sessionId || '',
      data.nombre || '',
      data.cargo || '',
      data.departamento || '',
      data.entrevistador || '',
      data.fecha || '',
      data.numPregunta || '',
      data.pregunta || '',
      data.respuestaTexto || '',
      audioUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function guardarAudio(base64DataUrl, sessionId, numPregunta) {
  // El data URL viene como "data:audio/webm;base64,AAAA..."
  const partes = base64DataUrl.split(',');
  const bytes = Utilities.base64Decode(partes[1]);
  const nombreArchivo = `${sessionId}_p${numPregunta}_${Date.now()}.webm`;
  const blob = Utilities.newBlob(bytes, 'audio/webm', nombreArchivo);

  const folder = DriveApp.getFolderById(FOLDER_ID);
  const file = folder.createFile(blob);
  return file.getUrl();
}
