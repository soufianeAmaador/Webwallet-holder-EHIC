<div align="center">
 <h1>User webwallet EHIC</h1>
 <span><b> Work in progress:  </b></span></a>
 <span><b> Docker implementation need to be added </b></span></a>
 <p>Webwallet for the EHIC project: a webwallet that stores the user's <b>European Health Insurance Card</b> (EHIC) received from the insurance company in the form of a <b>Verifiable Credential</b> upon request. <p>
</div>

# Running the app locally

Open the terminal in the Angular application and run the following command:

`ng serve`

The webportal will be available at `http://localhost:4201/`

# How it works
The application starts with a user requesting a European Health Insurance Card in the form of a Verifiable Credential from the [insurance webportal](https://github.com/soufianeAmaador/Webportal-Issuer-EHIC). This starts an exchange session. 

After the exchange session is created in the issuer's backend server, the Pre-Authorized Code Flow begins generating and sending a request from the issuer of the verifiable credentials to the holder's webwallet, telling the wallet what kind of Credential from the issuer must be requested. The request is accompanied by a pre-authorized code and optional user pin, requiring the end user to enter a PIN when using the pre-authorized code. Instead of sending a request, the issuer can also generate a QR code with the same data:

```
http://localhost:8080/api/siop/initiateIssuance/
?issuer=http%3A%2F%2Flocalhost%3A8080%2Fissuer-api%2Fdefault%2Foidc%2F
&credential_type=EuropeanHealthInsuranceCard
&pre-authorized_code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MGQzNzkyNi0yNmRlLTRjOTktODRjMy1jMDk1OTgwMWRkYmEiLCJwcmUtYXV0aG9yaXplZCI6dHJ1ZX0.tubtX-jiDNcQmr4cRlQntTyIXmVuwx2xIhyRL-2kxCg
&user_pin_required=false
```

After <b>activating</b> this link, a request is sent from the issuer to the backend of the holder's wallet. In the backend, the <b>pre-authorized code</b> is exchanged for an <b>access token</b> on the issuer's <b>token endpoint</b> to retrieve the credentials. This streamlines the user experience. The issuer can choose to make the issue even more secure by setting and requiring a user PIN before receiving the <b>verifiable credential</b>. The obtained <b>access token</b> is then used to request the issuance of the verifiable credential from the issuer's authentication endpoint. The webwallet must include appropriate <b>proof of possession</b> of the key material to which the credential is bound with the request. Once approved, the issuance process starts where the backend wallet starts an “issuer-initiated issuance” session with the response from the issuer, which is presented to the front-end by means of a <b>session Id</b>:

`
http://localhost:4201/wallet/?sessionId=1665cb2f-76f8-48b1-86d7-c48c5a43510b
`

![Retrieval session information](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/752ed226-3576-49b3-a39d-9368d7969d11)

With this <b>session ID</b>, the wallet portal is able to retrieve the details of the issue request and present it to the holder: 
![image](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/c63472b3-6e36-4d41-bb6e-6032ae8217ab)

After clicking 'Accept', an OpenID-based OIDC4SSI/SIOP information exchange protocol starts.
![image](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/67304246-1994-4946-929f-7fa9d9c27bab)

The wallet backend then communicates with the issuer backend to receive the verifiable credential that completes the issuance process (see image below for a high-level overview of the issuer-initiated exchange process):
![issuer-initiated exchange process](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/092391a3-321a-481b-9fad-7ebe0c352ccf)

The wallet navigates to the overview where all obtained login details are listed:
![Overview Credentials](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/58443f7b-f9ff-49ea-bfc5-6e2223cc6366)

The user is now in possession of the verifiable credential European Health Insurance Card and can check the details of the data. The verifiable credential contains specific data related to the European Health Insurance Card and its holder, as well as general data about the verifiable credential, as well as the issuer, validity and expiration date of the verifiable credentials:
![Details EHIC](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/ed1df6ed-a84f-490d-a2ee-8f08c13a4fce)

During the generation of the verifiable credential, the European Health Insurance Card is cryptographically signed with a digital signature by the issuer. This allows the holder's wallet to prove cryptographically that they are in rightful possession of the European Health Insurance Card they are presenting by proving that the device that obtained the identification is the same device it is presented with:

```
{
"format" : "jwt_vc", 
"proof" : 
   {
     "jwt" :"eyJraWQiOiJkaWQ6a2V5Ono2TWtuMWZ3Q29XNzhTWFNOVk0xRnR2WWFaaHpzcnR4WXlNdnZpRnBHbmhX  cjJ1VyN6Nk1rbjFmd0NvVzc4U1hTTlZNMUZ0dllhWmh6c3J0eFl5TXZ2aUZwR25oV3IydVciLCJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtuMWZ3Q29XNzhTWFNOVk0xRnR2WWFaaHpzcnR4WXlNdnZpRnBHbmhXcjJ1VyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pc3N1ZXItYXBpL2RlZmF1bHQvb2lkYy8iLCJpYXQiOjE2NzkyNTMyNzEsIm5vbmNlIjoiYTUzOTlmZDUtMzFjNS00MGE5LWI5ZjMtZDI4ZWEyM2UyNGVhIn0.mkqutPlLvOWv__uRAAk_sgiwkx1eEwSId20OPormGzwkHga_azbFeoceDzeMA4z8quZ6hGf8sx98qSPk2BhbDQ", 
"proof_type" : "jwt"
}, 
"type" : "EuropeanHealthInsuranceCard"
}
```

![Signature](https://github.com/soufianeAmaador/Webwallet-holder-EHIC/assets/70653226/701ee469-9873-465c-8f75-859f03dd200e)

