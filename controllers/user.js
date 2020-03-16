const express = require('express');

exports.getLogin = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
}

