{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "include": [
            "../universal",
            "app/app.js",
            "app/index.controller.js",
            "app/directives",
            "app/screens",
            "app/services",
            "app/widgets"
        ],
        "exclude": [ "client/e2e-tests", "app.bundle.js" ],
        "includePattern": ".+\\.js$"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
