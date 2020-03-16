const express = require('express');

// Controllers containing functions to process / handle routes
exports.index = (req, res) => {
    res.render('welcome');
}