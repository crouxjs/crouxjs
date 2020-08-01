# crouxjs

A simple library to write custom shell commands using javascript

Ideas :

- [ ] Have a "router-like" system to handle multiple depth commands.

  - Example :

    ```js
    const app = croux();
    const router = croux.router();

    router.use('activemq', () => {...});
    router.use('consul', () => {...});

    app.use('start', router);
    // Now you can call 'start activemq' or 'start consul'
    ```

- [ ] Be able to pass variable in the command call and get them in the injected Request params.

  - Example :
    ```js
    const app = croux();
    app.use('open :file', (req) => {
      const fileName = req.params.file ? req.params.file : '.';
      [...]
    });
    ```

- [ ] Be able to specify special arguments and get them in the injected Request. The params will take the name of the full special argument
  - Example :
    ```js
    const app = croux();
    app.use('advanced command [--help, -h]', (req) => {
      if(req.params.help) {
         // Return help details
      } else {
        [...]
      }
    });
    ```
