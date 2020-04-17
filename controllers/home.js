const express = require('express');

// Controllers containing functions to process / handle routes
exports.index = (req, res) => {
    res.render('welcome', {
        title: 'Lexaid'
    });
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'Lexaid-Login'
    });
}
exports.dashboard = (req, res) => {
    res.render('admin-dashboard', {
        title: 'Lexaid-Dashboard'
    });
}
exports.briefs = (req, res) =>{
    res.render('briefs', {
        title: 'Lexaid-Briefs'
    });
}
exports.quotes = (req, res) =>{
    res.render('quotes', {
        title: 'Lexaid-Quotes'
    });
}
exports.blog = (req, res) =>{
    res.render('blog', {
        title: 'Lexaid-Blog'
    });
}