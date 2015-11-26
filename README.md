TIIP
====
Thin Industrial Internet Protocol

TIIP is a wire protocol using JSON as its infoset. It is created for lightweight messaging in IoT solutions. It is loosely defined to support API creation.

| Key | Description | Json data type | Valid values | Mandatory |
| --- | ----------- | -------------- | ------------ | --------- |
| protocol   | Protocol name/version                                            | String          | tiip.0.8 | Yes |
| timestamp  | Seconds since 1 Jan 1970, as String. Controlled by the server.   | String          |          | No (Yes if no clientTime) |
| clientTime | Timestamp from client. Seconds since 1 Jan 1970, as String.      | String          |          | No (Yes if no timestamp) |
| mid        | Message ID.                                                      | String          |          | No |
| sid        | Session ID.                                                      | String          |          | No |
| type       | Message type (see recommended values in details below).          | String          |          | No |
| source     | ID(s) of the origin module(s) or node(s).                        | Array of String |          | No |
| pid        | Id of the targeted process or sub-system.                        | String          |          | No |
| signal     | The intended operation or command.                               | String          |          | No |
| payload    | Arguments, data etc. Binary data should be Base64 encoded.       | Array           |          | No |
| ok         | Boolean indicating success or failure. (Only for replies)        | Boolean         |          | No |
| tenant     | ID of a tenant in a multi-tenancy solution.                      | String          |          | No |

### Key details

#### protocol
The name/ID of the protocol (including version). Ex: "tiip.0.8"

#### timestamp
Seconds since 1 Jan 1970, as String. Include as many decimals as needed for increased accuracy (millisecond accuracy is often convenient). 
Handeled centrally - for instance set by the server for each messages on their arrival. See also `clientTime`.

#### clientTime
The timestamp set by clients (devices) when a message is constructed. This is separate to `timestamp` because it can not be trusted by the central point (server) to be correct or same as every other message creator in the system.

#### mid
Message ID. To identify an answer to a request for instance, in asyncronous communication.

#### sid
Session ID. To identify a session in case of non-implicit sessions.

#### type
Some different standard values are:
- **init, kill**: Messages for persistant connections, a "login" message (answered with *rep*) and a disconnect message.
- **req, rep**: Request-reply pattern.
- **sub**: Publish-subscribe pattern: Subscription request.
- **pub, unsub**: Publish-subscribe pattern: Publication and unsubscribe messages (no replies).
- create, read, update, delete: The standard "CRUD": the four basic functions of persistant storage, to use instead of req if needed.

#### source
Origin ID, with prepended nodes further along the communication chain if needed.

#### pid
The targeted process or sub-system. An ID or address that the receiver can use to route the message internally.

#### signal
Meant to be used as the "function" of the API between 2 communication nodes -- the command to the receiver. (`payload` contains the functions "arguments".)

#### payload
The actual thing that needs to be sent to the other side. Often regarded as the "arguments" to the API "function" called in `signal`.

**Ex:** 
- Sensor values (push data from a device)
- User records (requested from a database)
- Notification records published on an internal bus channel for instance
- An error message
- etc.

#### ok
Simple key in a reply message that indicates the outcome of a request as a boolean.

#### tenant
ID of a tenant in a multi-tenancy solution. Depending on the communication, 

### By example
A gateway sends position data to the server:
```json
{
    "protocol": "tiip.0.8",
    "clientTime": "1379921889.4",
    "type": "pub",
    "signal": "updatePosition",
    "source": ["gpsSensor239"],
    "payload": [59.21625, 10.93167]
}
```

Message from the server to a gateway that the motor should be stopped:
```json
{
    "protocol": "tiip.0.8",
    "timestamp": "1387345934.702",
    "type": "req",
    "pid": "motor",
    "signal": "stop"
}
```

Message from a web client to make a change in the configuration data of a user:
```json
{
    "protocol": "tiip.0.8",
    "clientTime": "1387349004.221",
    "type": "req",
    "pid": "configuration",
    "signal": "updateUserDashboard",
    "payload": ["4Xd0hN3z", "map", "temperature", "alarms"]
}
```


## Installation

```shell
npm install tiip
```

The package supports use of require.

## Test

Karma is used for unit testing. To run the test install karma and dependencies thrue Node package manager with

```shell
gulp test
```
