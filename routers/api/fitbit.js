const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
router.get('/', (req, res) => {
    res.redirect('https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DJNL&redirect_uri=https://172.20.10.14:52423/api/fitbit/auth/redirect&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800');
    // res.render('auth')
})
router.get('/redirect', (req, res) => {
    const code = req.query.code;
    let url = 'https://api.fitbit.com/oauth2/token';
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic MjJESk5MOjllMDQyNTFjZDBmZTllOWNmNTUxY2VkM2JkODQwNzVi'
        }
    }
    let body = {
        ClientId: '22DJNL',
        grant_type: 'authorization_code',
        redirect_uri: 'https://172.20.10.14:52423/api/fitbit/auth/redirect',
        code: code
    }
    axios
        .post(url, querystring.stringify(body), config)
        .then(result => {
            console.log(result.data.user_id);
            user_id=result.data.user_id;
            // url = "https://api.fitbit.com/1/user/-/profile.json"
            url = "https://api.fitbit.com/1/user/"+user_id+"/activities/heart/date/today/1d.json";
            let token = result.data.access_token;
            let config = {
                headers:{
                    'Authorization':'Bearer '+token
                }
            }

            // axios.post(url,null,config)
            axios.get(url,config)
            .then(result => {
                res.json(result.data)
                // result = result;

            }
            )
        })
        
    // res.send(result);
    // axios({
    //     method: 'post',
    //     url:url,
    //     data:querystring.stringify(body),
    //     headers:headers
    // })

})
module.exports = router;

