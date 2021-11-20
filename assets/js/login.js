$(function () {
    // 点击注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verifyO函数自定义校验规则
    form.verify({

        // 自定义一个叫做pwd的密码验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

        // 确认俩次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容还需要拿到密码框中的内容
            // 然后进行一次等于的判断如果判断失败, 则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '俩次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            // console.log(res.status);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登陆!')

            // 当注册成功时自动跳转到登陆界面
            $('#link_login').click()
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',

            // 快速获取表单中所有的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // console.log(res.token);
                // 将登陆成功得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })
})

