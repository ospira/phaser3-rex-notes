import { Cooldown } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
decorators:
    cooldown: 1000
```
or
```yaml
cooldown: 1000
```
```yaml
cooldown: {duration:1000}
```
*/

var CreateCooldownNode = function (data, child) {
    return new Cooldown({
        duration: (IsPlainObject(data)) ? data.duration : data,
        child: child
    })
}

export default CreateCooldownNode;