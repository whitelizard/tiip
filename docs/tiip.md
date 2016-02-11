# Global





* * *

### pack(type, pid, signal, args, payload, mid, tenant, source, ok) 

Pack parameters into tiip json

**Parameters**

**type**: `string`, type of message (e.g. pub, sub, req)

**pid**: `string`, target module

**signal**: `string`, command/API function

**args**: `object`, object with arguments

**payload**: `array`, array of data

**mid**: `string`, message ID

**tenant**: `string`, tenant name/id

**source**: `array`, array with IDs of nodes that the message passed

**ok**: `boolean`, ok signal for reply messages

**Returns**: `string`, JSON tiip message


### packObj(obj) 

Javascript object into tiip JSON message

**Parameters**

**obj**: `object`, JS object

**Returns**: `string`, JSON tiip message


### unpack(textMsg) 

Unpack tiip message into JS object

**Parameters**

**textMsg**: `string`, JSON tiip message

**Returns**: `object`, tiip msg as JS object


### unpackVerify(textMsg) 

Unpack tiip message with checking

**Parameters**

**textMsg**: `string`, JSON tiip message

**Returns**: `object`, tiip msg as JS object



* * *



**Author:** Esbjörn Blomquist



**Overview:** Thin Industrial Internet Protocol.


