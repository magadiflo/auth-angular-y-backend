# AuthApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

---

## Guards

Con respecto a los guards implementados en este proyecto, Fernando Herrera solo implementa el guard **CanActivateFn**, mientras que en mi caso implemento tanto el 
**CanMatchFn** como el **CanActivateFn** y en ambos estoy colocando el mismo código. Lo hago así ya que según la documentación el **CanMatchFn** es como el deprecado **CanLoad** que se utilizaba para rutas con lazyLoad (evitar dascarga de módulo). 
