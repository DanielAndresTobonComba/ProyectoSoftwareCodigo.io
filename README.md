## Patrones y Arquitectura de Software

A continuación, se presentan los patrones arquitectónicos y de diseño utilizados en el proyecto, junto con su justificación y forma de implementación.

| Elemento | Tipo | Justificación | Implementación en el Proyecto |
|---------|------|---------------|-------------------------------|
| **Arquitectura Cliente–Servidor (Frontend)** | Arquitectura | Permite separar la interfaz de usuario de la lógica de negocio y del acceso a datos. Facilita la escalabilidad y la interacción mediante API REST. | El frontend (HTML, CSS, JS) actúa como cliente que consume los endpoints REST del backend. |
| **Arquitectura Hexagonal / Ports & Adapters (Backend)** | Arquitectura | Favorece la separación de responsabilidades, facilita pruebas unitarias, permite cambiar bases de datos o frameworks sin afectar el dominio. | El backend organiza sus capas en dominio (lógica), aplicaciones (servicios) y adaptadores (controladores y repositorios). |
| **Patrón Singleton** | Patrón de diseño | Garantiza que ciertas clases tengan una única instancia global, útil para manejar configuraciones, servicios compartidos o conexiones. | Aplicado en servicios específicos del backend que requieren una única instancia o manejo centralizado. |
| **REST como estilo arquitectónico de comunicación** | Arquitectura | Facilita la interoperabilidad entre frontend y backend, permite operaciones CRUD y escalabilidad del sistema. | Endpoints diseñados con prácticas REST para productos, usuarios, autenticación y facturación. |
| **MVC en el Frontend** | Patrón de arquitectura/presentación | Organiza la interfaz separando la lógica de negocio del manejo del DOM y de los datos internos en el cliente. | Controladores JS manejan la lógica; las vistas son HTML; los modelos representan datos locales. |
| **Repository (implícito dentro de Hexagonal)** | Patrón de diseño | Permite abstraer la capa de datos, evitando dependencias directas con la base de datos. | Implementado mediante interfaces que definen operaciones, y adaptadores que interactúan con la base SQL. |
