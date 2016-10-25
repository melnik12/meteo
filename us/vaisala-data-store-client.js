//var storage = 
require('seneca')()
    .client()
    .act({ role: 'entities', cmd: 'save' }, console.log);


