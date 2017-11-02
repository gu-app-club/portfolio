const SQLURL = "localhost"
const TEST_DBNAME = "gu_port_testing"
const DBNAME = "gu_port_dev"
const SQLUSER = "root"
const SQLPASS = ""
const ISPROD = (process.env.NODE_ENV === 'production')
module.exports = {
    SQLURL,
    TEST_DBNAME,
    DBNAME,
    SQLUSER,
    SQLPASS,
    ISPROD
};