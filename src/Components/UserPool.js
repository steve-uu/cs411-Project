import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_xjxTnRP26",
    ClientId: "6u20i7qlbc1j1p0c9vutqbp726"
}
 
export default new CognitoUserPool(poolData);