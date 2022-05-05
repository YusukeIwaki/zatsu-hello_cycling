const { buildRequestFromArgs, executeRequest, useFileCache, updateKeyValue, PerformRequest, Request } = require('@zatsu/core')

const baseURL = 'https://resource.hellocycling.jp'
const tokenCache = useFileCache('hellocycling', 'token')

/**
 *
 * @param {PerformRequest} preformRequest
 * @param {Request} request
 * @returns
 */
async function printRequestResponse(preformRequest, request) {
    console.log("--------------------")
    console.log(`${request.method} ${request.path}\n`)
    request.headers.forEach(([name, value]) => {
        console.log(`${name}: ${value}`)
    })

    if (request.body) {
        console.log(`\n${request.body.toString('utf8')}`)
    }

    const response = await preformRequest(request)

    console.log("--------------------")
    console.log(`HTTP ${response.status}\n`)
    response.headers.forEach(([name, value]) => {
        console.log(`${name}: ${value}`)
    })

    if (response.body) {
        console.log(`\n${response.body.toString('utf8')}`)
    }
    return response
}

/**
 *
 * @param {PerformRequest} preformRequest
 * @param {Request} request
 * @returns
 */
function injectCommonHeaders(performRequest, request) {
    request.headers.concat([
        ['Accept', ' application/json'],
        ['app-version', '3.12.2'],
        ['os', ' ios'],
        ['Accept-Language', 'ja'],
        ['Accept-Encoding', 'gzip, deflate, br'],
        ['Content-Type', 'application/json'],
        ['Content-Length', '29'],
        ['User-Agent', 'HELLOCYCLING/1 CFNetwork/1331.0.7 Darwin/21.4.0'],
        ['lang', ' ja'],
        ['Connection', 'keep-alive'],
        ['os-version', '15.4'],
    ])
    return performRequest(request)
}

/**
 *
 * @returns Promise<String>
 */
async function fetchToken() {
    const request = {
        method: 'POST',
        path: '/app/token',
        headers: [],
        queryParameters: new URLSearchParams(),
        body: JSON.stringify({ auth_code: 'DEVELOP-HELLO' }),
    }
    const context = {
        baseURL: baseURL,
        interceptors: [
            injectCommonHeaders,
        ],
    }
    const response = await executeRequest(request, context)
    const json = JSON.parse(response.body.toString('utf8'))
    return json.data.token
}

/**
 *
 * @param {PerformRequest} performRequest
 * @param {Request} request
 */
async function authedRequest(performRequest, request) {
    let token = await tokenCache.get()
    let fetchedToken
    if (!token) {
        fetchedToken = await fetchToken()
        token = fetchedToken
    }
    // console.log(`Using token=${token}`)
    updateKeyValue(request.headers, 'Authorization', token)
    let response = await performRequest(request)
    if (response.status == 401) {
        fetchedToken = await fetchToken()
        // console.log(`Retry: with token=${fetchedToken}`)

        updateKeyValue(request.headers, 'Authorization', fetchedToken)
        response = await performRequest(request)
    }

    if (response.status >= 200 && response.status < 300 && !!fetchedToken) {
        await tokenCache.put(fetchedToken)
    }
    return response
}


async function main() {
    const args = process.argv.slice(2);

    const request = await buildRequestFromArgs(args)
    const context = {
        baseURL: baseURL,
        interceptors: [
            injectCommonHeaders,
            // printRequestResponse,
            authedRequest,
        ],
    }
    const response = await executeRequest(request, context)

    if (response.body) {
        console.log(JSON.parse(response.body.toString('utf8')))
    }
}

main()
