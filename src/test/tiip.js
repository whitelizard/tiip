describe('tiip', function() {
    beforeEach(module('tiip'));
       
    it('all arguments', inject(function (tiip) { //parameter name = service name
        expect( tiip.unpack(tiip.pack('type', 'pid', 'signal', ['payload'], 'mid', 'tenant', 'source', 'sid', true)) )
        .toEqual(jasmine.objectContaining({
            type: 'type',
            pid: 'pid',
            signal: 'signal',
            payload: ['payload'],
            mid: 'mid',
            tenant: 'tenant',
            source: 'source',
            sid: 'sid',
            ok: true,
        }));
    }));

});
