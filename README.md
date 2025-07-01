# Portal Web de Pulpí

Este portal ha sido diseñada para mostrarse las 24 horas del día en **pantallas interactivas táctiles** repartidas por toda la ciudad de Pulpí y sus respectivas pedanías, para servir como fuente de información actualizada para los ciudadanos. No obstante, es accesible desde cualquier dipositivo con internet.

Este repositorio **NO** es la web principal.

La web principal, creada también por mí ([Denis Stoyanov](https://github.com/DenisSValentin)) utilizando el framework propio de la Diputación de Almería (CMSDip Pro) es [mercado.pulpi.es](https://mercado.pulpi.es/).

---

## 🤔 Entonces, ¿por qué este repositorio?

La creación de este repositorio es para tener un **sistema de respaldo temporal**, ya que la web principal está alojada en los servidores de la Diputación de Almería y estos suelen fallar bastante (de hecho, si intentas entrar y se queda cargando un buen rato, es que está sucediendo justo en ese momento).

Por ello, para que los ciudadanos no se queden con las pantallas interactivas sin funcionar, se redigiren temporalmente a esta web local.

Sin embargo, esto tiene sus limitaciones. Al estar fuera de los servidores de la diputación, no se puede recuperar información de la base de datos, y las noticias y ficheros deben de ser estáticos, solo Front-end.

---

## 🎯 Perspectiva con la que se ha creado la web de [mercado.pulpi.es](https://mercado.pulpi.es/)

Como esta página web se muestra en las pantallas interactivas esparcidadas por toda la ciudad, se busca la mayor simplicidad y facilidad de uso, ya que son utilizadas por personas de todas las edades.

Su misión es mantener a la comunidad informada sobre las noticias y eventos más relevantes del municipio.

---

## ✨ Apartados Principales

La web está estructurada en 6 secciones clave para facilitar el acceso a la información:

* **Noticias**: Últimas novedades y comunicados del ayuntamiento.
* **Eventos Culturales**: Agenda de actividades culturales, conciertos y exposiciones.
* **Deportes**: Información sobre eventos y competiciones deportivas.
* **Comercio**: Directorio e información sobre los comercios locales.
* **Espejo**: Al estar la web alojada principalmente en pantallas interactivas con cámara incorporada, existe la opción de que las personas se vean reflejadas como si de un espejo se tratara.
* **Descubre Pulpí**: Se muestra un PDF interactivo que permite avanzar y retroceder a través de él para conocer más sobre la historia y los lugares de interés de Pulpí.

---

## 🛠️ Tecnologías Utilizadas

El proyecto se ha construido utilizando tecnologías web estándar y ligeras para asegurar un rendimiento óptimo y una compatibilidad máxima:

* **HTML5**: Para la estructura semántica del contenido.
* **CSS3**: Para el diseño visual y los estilos.
* **JavaScript**: Para funcionalidades interactivas.
* **Backend**: La lógica del lado del servidor para el sitio dinámico se gestiona con **CMSDip Pro**, un framework de desarrollo propio de la Diputación de Almería que se conecta a bases de datos de Lotus Notes.
