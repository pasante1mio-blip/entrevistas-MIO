# Diagnóstico Organizacional MIO-Oil — Guía de instalación

## 1. Backend (Google Apps Script)

1. Crea o abre tu Google Sheet de respuestas.
2. Menú **Extensiones → Apps Script**.
3. Borra el contenido de `Code.gs` que aparece por defecto y pega el contenido
   del archivo `Code.gs` de esta carpeta.
4. Crea una carpeta en Google Drive para los audios, ábrela, y copia el ID
   que aparece en la URL después de `/folders/`.
5. En `Code.gs`, reemplaza `PEGA_AQUI_EL_ID_DE_TU_CARPETA_DE_DRIVE` con ese ID.
6. Guarda (ícono de disquete).
7. **Implementar → Nueva implementación → Aplicación web.**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
8. Copia la URL que termina en `/exec`.
9. La primera vez que se ejecute te pedirá autorizar permisos: acepta con tu cuenta de Google.

## 2. Frontend (GitHub Pages)

1. Crea un repositorio nuevo en GitHub, por ejemplo `entrevistas-mio`.
2. Sube **todos** los archivos y carpetas de esta carpeta (`index.html`,
   `registro.html`, `entrevista.html`, `gracias.html`, `css/`, `js/`),
   manteniendo la misma estructura.
3. Abre `js/config.js` (puedes editarlo directamente en GitHub) y reemplaza
   `PEGA_AQUI_TU_URL_DE_APPS_SCRIPT/exec` con la URL que copiaste en el paso 8 anterior.
4. En el repositorio: **Settings → Pages** → Source: rama `main`, carpeta `/root`.
5. GitHub te dará una URL tipo `https://tuusuario.github.io/entrevistas-mio/`.
   Esa es la que compartes con los entrevistados.

## 3. Probar

- Abre la URL de GitHub Pages, completa el registro, responde 1-2 preguntas
  (una en texto, una en audio) y revisa que aparezcan filas nuevas en tu
  Google Sheet y el archivo de audio en tu carpeta de Drive.
- Si no aparece nada: revisa que la URL en `config.js` termine en `/exec`
  y que la implementación tenga acceso "Cualquier usuario".

## Notas importantes

- El envío usa `mode: 'no-cors'`, una limitación conocida de Apps Script:
  el navegador no puede leer la respuesta del servidor, así que la app
  **no puede confirmar visualmente si el guardado fue exitoso**. Por eso
  es clave hacer la prueba del punto 3 antes de usarla con entrevistados reales.
- Cada respuesta se envía en cuanto el entrevistado presiona "Siguiente",
  no al final de las 20 preguntas — así no se pierde nada si cierran la
  pestaña a mitad de camino.
- El micrófono solo funcionará si la página se abre por **HTTPS**
  (GitHub Pages ya lo es) y el usuario acepta el permiso del navegador.
