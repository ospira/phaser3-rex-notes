var AreDifferent = function (arr, property, config) {
    if (typeof (config) === 'boolean') {
        config = {
            returnDetail: config
        }
    }

    var {
        wildcard = undefined,
        returnDetail = false
    } = config;

    if (arr.length === 0) {
        if (returnDetail) {
            return {
                property: property,
                result: false,
                catch: [],
            }
        } else {
            return false;
        }
    }

    var hasWildcard = !!wildcard;
    var targetValues = {};
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        var item = arr[i];
        var itemValue = item[property];

        if (hasWildcard && (itemValue === wildcard)) {
            continue;
        }

        if (targetValues[itemValue]) {
            if (returnDetail) {
                return {
                    property: property,
                    result: false,
                    catch: [item],
                }
            } else {
                return false;
            }
        } else {
            targetValues[itemValue] = true;
        }
    }

    if (returnDetail) {
        return {
            property: property,
            result: true,
            resultArray: [...arr],
        }
    } else {
        return true;
    }
}

export default AreDifferent;