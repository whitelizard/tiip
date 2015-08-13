# TIIP
Thin Industrial Internet Protocol

TIIP is a wire protocol using JSON as its infoset. It is created for lightweight messaging in IoT solutions. It is loosely defined to support API creation.

## TIIP 0.8

| Key | Description | Json data type | Valid values | Mandatory |
| --- | ----------- | -------------- | ------------ | --------- |
| protocol    |	Protocol name                                                                     |	String          | tiip.0.8                                                               | Yes |
| timestamp   | Seconds since 1 Jan 1970, as String. Controlled by the server.                    | String          |                                                                        | No (Yes if no clientTime) |
| clientTime  | Timestamp from client. Seconds since 1 Jan 1970, as String.                       | String          |                                                                        | No (Yes if no timestamp) |
| destination | Optional destination ID(s). In case of server or gateway hierarchy.                   | Array of String |                                                                        | No |
| source      | Optional source ID(s). In case of server or gateway hierarchy.                        | Array of String |                                                                        | No |
| type        | Message type (see valid values)                                                   | String          | init, kill, create, read, update, delete, req, rep, pub, sub, unsub | No |
| pid         | Id of a service, sensor or process. (Hierarchic pid should use "." between nodes) | String          |                                                                        | No |
| mid         | Message ID.                                           | String          |                                                                        | No |
| signal      | Signal to indicate an operation or command.                                       | String          |                                                                        | No |
| ok          | Boolean indicating success or failure.                                            | Boolean         |                                                                        | No |
| payload     | Arguments, data etc. Binary data should be Base64 encoded.                        | Array           |                                                                        | No |

### Key details

#### protocol
The name/ID of the protocol (including version). Ex: "tiip.0.8"

#### timestamp
Seconds since 1 Jan 1970, as String. Include as many decimals as needed for increased accuracy (millisecond accuracy is often convenient). 
Handeled centrally - for instance set by the server for each messages on their arrival. See also `clientTime`.

#### clientTime
The timestamp set by clients (devices) when a message is constructed. This is separate to `timestamp` because it can not be trusted by the central point (server) to be correct or same as every other message creator in the system.

#### destination
Array of IDs for routing purposes in case of more advanced device or server hierachies.

#### source
Data source ID, with additional nodes in case of more advanced device or server hierachies.

#### type
Some different standard values are:
- **init, kill**: For persistant connections, a "login" message and a disconnect message.
- **create, read, update, delete, req**: This is the standard CRUD - the four basic functions of persistant storage, plus additional general request type for non-CRUD action.
- **rep**: A reply to a message.
- **pub, sub, unsub**: Publish-subscribe pattern.

#### pid
Indicating a certain sub-system. Could be used both as describer of what part the message comes from, or what process it is targeting (the `type` should clarify that).

#### mid
Message ID. To identify an answer to a request for instance, in asyncronous communication.

#### signal
This is meant to be used as the "function" of the API between 2 communication nodes. And `payload` contains the functions "arguments".

#### ok
Simple key to identify if a request of any type went well or not (boolean value).

#### payload
The actual thing that needs to be sent to the other side. Often regarded as the "arguments" to the API "function" called in `signal`.

**Ex:** 
- Sensor values (push data from a device)
- User records (requested from a database)
- Notification records published on an internal bus channel for instance
- An error message
- etc.

### By example
```json
{
    "protocol": "tiip.0.7",
    "clientTime": "1379921889.4",
    "type": "data",
    "pid": "position",
    "payload": [59.21625, 10.93167]
}
```
`signal` could be used instead of pid above


```json
{
    "protocol": "tiip.0.7",
    "timestamp": "1387345934.702",
    "type": "action",
    "pid": "motor",
    "signal": "stop"
}
```


```json
{
    "protocol": "tiip.0.7",
    "clientTime": "1387349004.221",
    "type": "update",
    "pid": "conf",
    "signal": "userDashboard",
    "payload": ["4Xd0hN3z", "map", "temperature", "alarms"]
}
```

[add more examples here]
