class CanIUse {
    rulesDictionary = require("../data/rulesDictionary.json");
    wellSupportedProperties = require("../data/wellSupportedProperties.json");
    canIUseData = require("../data/caniuse.json");
    selectedBrowsers = ['IE', 'Firefox', 'Chrome', 'Safari', 'Opera'];

    isWellSupported(word) {
        return this.wellSupportedProperties["well-supported-properties"].indexOf(word) >= 0;
    }

    getNormalizedRule(word) {
        let dict = this.rulesDictionary;
        let normalizedRule;
        for (var p in dict) {
            if (word.toLowerCase() == p.toLowerCase()) {
                normalizedRule = dict[p];
                break;
            }
        }
        return normalizedRule || word;
    }

    retrieveInformation(word, callback) {
        let caniuse = this;
        if (caniuse.isWellSupported(word)) {
            callback("Can I Use: All browsers ✔ (CSS 2.1 properties, well-supported subset)");
        }
        else {
			const rule = this.canIUseData.data[word]
			console.log('rule>>>>:',rule);
			if(rule){
				callback(caniuse.getSupportStatus(rule))
				return
			}else{
				callback('Can I Use: 未找到该属性，请在插件主页评论区联系我，注明属性名。谢谢！')
				return
			}
        }
    }

    getSupportStatus(data) {
		
        var stats = data.stats;
        var result = [];
        for (var i = 0; i < this.selectedBrowsers.length; i++) {
            var browser = stats[this.selectedBrowsers[i].toLowerCase()];
            var version = this.getVersion(browser);
            if (version) {
                result.push(this.selectedBrowsers[i] + " ✔ " + version);
            }
            else {
                result.push(this.selectedBrowsers[i] + " ✘");
            }
        }

        let message;
        if (result && result.length > 0) {
            message = "Can I Use: " + result.join(" ");
        }
        return message;
    }

    getVersion(stats) {
        var keys = Object.keys(stats).sort(function(a, b) {
            var aNumber = +a;
            var bNumber = +b;
            return aNumber > bNumber ? 1 : aNumber == bNumber ? 0 : -1;
        });

        var found;
        for (var i = 0; i < keys.length; i++) {
            var element = keys[i];
            if (stats[keys[i]].indexOf("a") >= 0 || stats[keys[i]].indexOf("y") >= 0) {
                found = keys[i];
                break;
            }
        }

        return found && found + "+";
    }
}

module.exports = CanIUse