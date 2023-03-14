class AppController {
    
    static async homePage(req, res) {
        const user = req.user;
        res.render('index.ejs', { user: user });
    }

    static async aboutUs(req, res) {
        const user = req.user;
        res.render('about.ejs', { user: user });
    }
}

module.exports = AppController;