function dateService(opts) {
    return {
        parseDate: (input) => {
            const result = {
                unix: undefined,
                utc: undefined
            };

            const t = ((input) || (input === 0)) ? Number(input) : null;
            let dt;
            if ((t) && (!isNaN(t))) {
                result.unix = t;
                dt = new Date(t);
                result.utc = dt.toUTCString();
            } else {
                dt = (input) ? new Date(input) : new Date();
                result.unix = dt.getTime();
                if (isNaN(result.unix)) {
                    const err = new Error("Invalid Date");
                    err.statusCode = 400;
                    throw err;
                }
                result.utc = dt.toUTCString();
            }

            return result;
        }
    };
}

module.exports = dateService;
