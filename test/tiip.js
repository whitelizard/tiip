describe('tiip', function() {
    beforeEach(module('tiip'));
       
    it('all arguments', inject(function (tiip) { //parameter name = service name
        expect( tiip.unpack(tiip.pack('type', 'pid', 'signal', {arg:22}, ['payload'], 'mid', 'tenant', 'source', 'sid', true)) )
        .toEqual(jasmine.objectContaining({
            type: 'type',
            pid: 'pid',
            signal: 'signal',
            arguments: {arg:22},
            payload: ['payload'],
            mid: 'mid',
            tenant: 'tenant',
            source: 'source',
            sid: 'sid',
            ok: true,
        }));
    }));

});
