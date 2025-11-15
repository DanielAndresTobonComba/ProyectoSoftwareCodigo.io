## Patrones y Arquitectura aplicados a los Casos de Uso

La siguiente tabla resume cómo cada caso de uso del proyecto se apoya en la arquitectura Cliente–Servidor, la arquitectura Hexagonal y los patrones de diseño seleccionados (Singleton, Repository, MVC, REST).

| Caso de Uso | Descripción | Arquitectura aplicada | Patrones utilizados | Justificación |
|-------------|-------------|------------------------|----------------------|----------------|
| **CU01 – Iniciar sesión** | El usuario ingresa sus credenciales y obtiene acceso al sistema. | Cliente–Servidor (el cliente envía credenciales al backend); Hexagonal (adaptador HTTP + servicio de autenticación). | REST, MVC, Singleton (servicio de autenticación). | Mantiene separación de responsabilidades: el frontend gestiona la vista y el backend valida utilizando un servicio único. |
| **CU02 – Ver catálogo de productos** | El usuario consulta los productos disponibles. | Cliente–Servidor; Hexagonal (puerto para obtener productos + adaptador a BD). | REST, Repository, MVC. | El controlador delega al dominio y el repositorio permite cambiar la BD sin afectar la lógica. |
| **CU03 – Cotizar productos** | El cliente selecciona productos y obtiene precio final. | Cliente–Servidor; Hexagonal (servicio de cotización). | MVC, REST. | El frontend maneja la vista; el backend calcula precios centralizados en el dominio. |
| **CU04 – Realizar compra** | El usuario genera una orden de compra y se persiste en el sistema. | Cliente–Servidor; Hexagonal (servicio de órdenes + repositorio). | Repository, REST, Singleton (gestor de ordenes si aplica). | La lógica crítica reside en el dominio, la persistencia está desacoplada mediante repositorios. |
| **CU05 – Gestión de usuarios (Admin)** | Crear, editar o eliminar usuarios. | Cliente–Servidor; Hexagonal (servicio de usuarios + adaptador de BD). | Repository, REST, MVC. | La capa de dominio controla las reglas; el frontend solo envía solicitudes y muestra resultados. |
| **CU06 – Gestión del módulo de facturación** | Consulta y generación de facturas. | Cliente–Servidor; Hexagonal (servicio de facturación + puerto de persistencia). | REST, Repository. | La facturación requiere lógica clara y aislada; Hexagonal permite mantenerla independiente del almacenamiento. |
| **CU07 – Visualizar perfil del usuario** | El usuario accede a su información personal. | Cliente–Servidor; Hexagonal (servicio de perfil). | REST, MVC. | Se mantiene una interacción limpia entre vista (frontend) y lógica de negocio (backend). |

