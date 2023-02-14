from django.test import TestCase

from core.forms import  ContactForm
class ContactFormTest(TestCase):
    
    @classmethod
    def setUpClass(cls):
       cls.valid_data={
           "first_name":"farid",
           "last_name":"bashirov",
           "email":"farid@mail.ru",
           "phone":"0555667404",
           "message":"farid",
       }
       cls.invalid_data={
           "first_name":"fsdafsafsafsafasfsafsafsafsafsaasfsafsdfdsafdsagdfsgdfsgdfgdfgjdfkgl;jadhslgkansdlknsdaflksdaflksda flsdak vlsadv lsdv sdlkv sdklv sdlkv sdvkl sdvkls vlksadnvklasnfklsadjvioksan vadnvoekivwjgvwjgvioehgoerigioghriogjvnoasijgnvoaisgdsgvodsjnvodsijgvgdsoifjsofjosdjvfioasdjgvoiarnjgvoiewjgnviodsjniobjnasdoigjniosgvjoiasdgjvnioewjgwkPFVEWJpogiheraiogadskjbvndsklanvklasdngflwjdflanvkjsdhfioqNFIOEWhioqJNFIAShfiowhFIOQWhfioqwhjfioqwjhfioqfhoiwahFOIqwhfioasdhgihfiowqhfioahfiahvidshiorsgjneofjwklnvcxzhguwahflksdhguiwhfnvlkdfzhgijboigfshoejhioehgiosahghvuidsgfvyudsgvuyasfgyufguyagfuiadsgfuygfyuwegEF8YEWGFIDSGHFIUEWAHGUIFDSGBYUISA",
           "last_name":"bashirov",
           "email":"farid",
           "phone":"0555667404",
           "message":"farid",
       }
    
    def test_valid_data(self):
           form=ContactForm(data=self.valid_data)
           self.assertTrue(form.is_valid)
    def test_invalid_data(self):
           form=ContactForm(data=self.invalid_data)
           self.assertFalse(form.is_valid)
    # def test_invalid_data_error_messages(self):
    #        form=form=ContactForm(data=self.invalid_data)
    #        print(form.errors)
    @classmethod
    def tearDownClass(cls):
         pass
    
