# Dones Espirituales

## Problema de Construcción

Actualmente estamos experimentando un problema con la construcción del proyecto en Fine. El error es:

```
/bin/bash: /home/fine/.bun/bin/bun: No such file or directory
```

Este error indica que el sistema está intentando usar Bun como gestor de paquetes, pero Bun no está instalado correctamente en la ruta especificada.

## Solución Temporal

Como solución temporal, hemos desplegado una versión estática del sitio en Netlify:

[https://dones-espirituales.netlify.app](https://dones-espirituales.netlify.app)

## Próximos Pasos

1. Contactar al soporte de Fine para resolver el problema de construcción.
2. Una vez resuelto, actualizar el proyecto para que se construya correctamente en Fine.

## Mensaje para el Soporte de Fine

"Estoy experimentando un error durante la construcción de mi proyecto: `/bin/bash: /home/fine/.bun/bin/bun: No such file or directory`. Parece que el sistema está intentando usar Bun como gestor de paquetes, pero Bun no está instalado correctamente. He intentado varias soluciones para usar npm en su lugar, pero el error persiste. ¿Podrían ayudarme a resolver este problema?"