# Mercado Vivo

Una aventura educativa en español: caminas por una ciudad, ayudas a sus personajes y aprendes cómo funcionan precios, órdenes, futuros y opciones.

## Jugar sin instalar nada

En GitHub, pulsa **Code → Download ZIP**, descomprime la carpeta y abre **Jugar.html** con Chrome o Safari. Todo el juego está en ese archivo. Funciona sin hosting, cuentas, claves ni consultas a una IA. No necesita Node ni Python para jugar.

- Flechas o WASD: caminar.
- E cerca de un personaje: conversar.
- Clic en el mapa: caminar hacia un punto.
- Lista de lugares y cuaderno: abrir misiones sin recorrer el mapa.
- En móvil: botones de movimiento y Hablar.
- Mi partida: exportar/importar progreso y cambiar atuendo.

El progreso se guarda en el navegador cuando permite almacenamiento local. Al abrir archivos locales, el comportamiento del guardado puede depender del navegador. Exporta tu partida para conservar un respaldo o cambiar de navegador/dispositivo. Las partidas no se sincronizan en línea.

## Qué incluye v0.1

12 misiones progresivas: formación de precios; escalera y profundidad; órdenes limitadas; ticks y multiplicadores; margen; cobertura de cosecha; contrato a plazo de divisas; put protectora; bull call spread; butterfly de calls; posición larga sintética; decisiones con reloj opcional.

Tres vidas por partida. Un fallo explica el error y permite reintentar; la casa de práctica recupera vidas. Hasta 100 XP por misión, sin duplicar XP al repetirla. Los cinco penales dan monedas cosméticas, separadas de la evaluación financiera.

El reloj de la última misión empieza al pulsar Comenzar y se pausa al cambiar de pestaña. Cerrar una misión abandona el intento sin penalización.

## Supuestos financieros

- Todos los precios, cantidades de ejercicio, multiplicadores y márgenes son ficticios. No se consulta CME ni una cuenta de inversión.
- El libro simulado consume ofertas por precio y cantidad. No reproduce prioridad de colas, algoritmos de asignación específicos por producto, latencia, órdenes ocultas, límites de mercado ni comisiones.
- Una orden limitada puede quedar pendiente. Una compra a mercado consume ofertas de venta; una venta consume ofertas de compra.
- El reto de margen usa garantía inicial de $300 y mantenimiento de $250 por contrato, saldo $1,000 y pérdida de estrés $120 por contrato. Dos contratos son el máximo que cumple ambos límites. El margen no limita pérdidas.
- Las coberturas de maíz asumen precio físico igual al precio del futuro al vencimiento, cobertura exacta, ausencia de riesgo de base y de costos adicionales. La put cuesta $200 por 1,000 unidades y tiene strike $5. No se modelan flujos de margen del futuro.
- El contrato a plazo de divisas fija USD 1,000 a MXN 20/USD. Se omiten costos e intereses.
- Las curvas de opciones son **resultados netos al vencimiento por unidad del subyacente**, con primas fijas, misma fecha, sin intereses, dividendos, costos ni ejercicio anticipado. No modelan precios de opciones antes del vencimiento.
- Bull call spread: comprar call 100 por 7 y vender call 110 por 3. Débito 4; pérdida máxima 4, ganancia máxima 6, equilibrio 104.
- Butterfly: comprar call 90 por 12, vender dos calls 100 por 6 cada una, comprar call 110 por 2. Débito 2; pérdida máxima 2, ganancia máxima 8 a 100; equilibrios 92 y 108.
- Largo sintético: comprar call 100 y vender put 100, primas iguales de 5. Resultado en el modelo: precio final menos 100; la put vendida genera obligaciones y margen.

Los puntos evalúan cumplir un objetivo con información disponible, no acertar el precio después. Completar el prototipo no certifica preparación para operar con dinero real.

## Fuentes

- [CME: formación de precios y libro de órdenes](https://www.cmegroup.com/education/articles-and-reports/overview-what-makes-ags-markets-work)
- [CME: margen de futuros](https://www.cmegroup.com/education/courses/understanding-the-benefits-of-futures/the-benefits-of-futures-margins)
- [Options Industry Council: estrategias](https://www.optionseducation.org/strategies/all-strategies-en)

## Desarrollo

No hay dependencias externas. Los archivos editables están en `dist/`. Para ejecutar las pruebas o regenerar el archivo único se requiere Node.js:

```sh
npm test
npm run bundle
```

Para servirlo localmente, si tienes Python:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Abre `http://127.0.0.1:8765`. GitHub guarda el código. Si posteriormente quieres un enlace público, `dist/` puede alojarse como sitio estático. Publicarlo y sincronizar partidas son pasos diferentes.

## Verificación de esta entrega

- 13 pruebas automáticas del motor: liquidez, órdenes parciales, límites, dirección de futuros, coberturas, resultados de opciones y validación de partidas.
- Campaña de 12 misiones completada en Chrome mediante servidor local; progreso conservado tras recargar.
- Pérdida y recuperación de vidas, movimiento por teclado y clic con ruta alrededor de edificios, penales, reloj y modo sin reloj comprobados.
- Sin errores de consola observados durante la campaña.
- `Jugar.html` se genera con los mismos archivos probados. La apertura directa por `file://` no se pudo verificar mediante la herramienta de navegador porque su política bloquea ese protocolo; debe comprobarse manualmente. La versión HTTP sí fue probada.
- Repositorio: [carlosarfg00/mercado-vivo](https://github.com/carlosarfg00/mercado-vivo). No se ha publicado como sitio web.

## Siguientes etapas

Bear spreads, volatilidad y griegas; comisiones; riesgo de base; ejercicio/vencimiento; stops; sesiones de estrés más elaboradas; sincronización opcional.

Las plataformas indicadas por el usuario son CME, Webull y GBM. **CME es una bolsa, no identifica por sí sola el bróker de su cuenta.** Antes de una integración hay que identificar el intermediario exacto, disponibilidad de API, permisos de datos y entorno de prueba. El juego no tiene conexión con ninguna de estas plataformas. Las futuras credenciales deben permanecer fuera del repositorio y del cliente público; la conexión de cuenta requiere un servicio independiente y separación inequívoca de paper/real.
