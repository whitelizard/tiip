import unittest
import re
import pym2m.protocols.tiip.tiip0_7 as tiip


class TestTiip07(unittest.TestCase):

    def __init__(self, methodName='runTest'):
        unittest.TestCase.__init__(self, methodName)

    def setUp(self):
        pass

    def tearDown(self):
        pass
    
    def test_01(self):
        # Pack
        msg1 = tiip.pack(pid='controllerX', signal='data', ok=None, payload=['someInput', 3.14], msgType='data', destination='dest', source='src')
        msg2 = tiip.pack('controllerX', 'data', None, ['someInput', 3.14], 'data', 'dest', 'src')
        msg1_untimed = re.sub(r'"timestamp": "[0-9\.]*"', r'', msg1)
        msg2_untimed = re.sub(r'"timestamp": "[0-9\.]*"', r'', msg2)
        self.assertEquals(msg1_untimed, msg2_untimed)
        
    def test_02(self):
        # Unpack
        msg1 = tiip.pack(pid='controllerX', signal='data', payload=['someInput', 3.14], msgType='data', destination='dest', source='src')
        msgDict1 = tiip.unpack(msg1)
        self.assertEquals(msgDict1['payload'], ['someInput', 3.14])
        self.assertNotIn('ok', msgDict1)

    def test_03(self):
        # Manual verification
        msg1 = tiip.pack(pid='controllerX', signal='data', payload=['someInput', 3.14], msgType='data', destination='dest', source='src')
        msgDict1 = tiip.unpack(msg1)
        err = tiip.isBadFormat(msgDict1)
        self.assertIsNone(err)
    
    def test_04(self):
        # Safe unpack
        msg1 = tiip.pack(pid='controllerX', signal='data', payload=['someInput', 3.14], msgType='data', destination='dest', source='src')
        try:
            msgDict1 = tiip.safeUnpack(msg1)
        except KeyError:
            self.fail("KeyError raised")

        
    def test_05(self):
        msgDict1 = tiip.safeUnpack(tiip.pack(ok=True, signal='created'))
        self.assertIn('signal', msgDict1)
        self.assertTrue(msgDict1['ok'])
        self.assertTrue('pid' not in msgDict1)
        
    def test_06(self):
        # Bad key detection
        msg1 = tiip.packRaw(something='data')
        try:
            msgDict1 = tiip.safeUnpack(msg1)
            self.fail("KeyError not raised")
        except KeyError:
            pass


        
    def test_07(self):
        # Bad version
        msg1 = tiip.pack(ok=True)
        msg1 = msg1.replace('7', '8')
        try:
            msgDict1 = tiip.safeUnpack(msg1)
            self.fail("KeyError not raised")
        except KeyError:
            pass
        
    def test_08(self):
        # Missing mandatory
        msg1 = tiip.pack(ok=True)
        msg1 = msg1.replace('protocol', 'signal')
        try:
            msgDict1 = tiip.safeUnpack(msg1)
            self.fail("KeyError not raised")
        except KeyError:
            pass
        

if __name__ == "__main__":
    unittest.main()
