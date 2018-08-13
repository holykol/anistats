module.exports = {
 	"extends": [
 		"standard",
 		"plugin:vue/essential"
	],
 	"rules": {
 		"indent": ["warn", 3],
 		"comma-dangle": ["warn", "always-multiline"],
 		"no-multiple-empty-lines": ["warn", {
 			"max": 2,
 		}],
 		"quotes": ["warn", "single", {
 			"allowTemplateLiterals": true,
 		}]
 	},
};