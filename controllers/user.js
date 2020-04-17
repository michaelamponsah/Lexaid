const express = require('express');

exports.login = (req, res) => {
    res.render('login', {
        title: 'Lexaid-Login'
    });
}

exports.dashboard = (req, res) => {
    res.render('admin-dashboard', {
        title: "Dashboard"
    });
}