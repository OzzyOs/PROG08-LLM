# Lord of the Rings Chatbot.. Dwarf Edition.

### De applicatie is gericht naar boeklezers (voornamelijk Lord of the Rings) die snel toegang willen tot passages vanuit de gegeven documentatie.

LLM die reageert met de rol van een, [insert preference], uit de wereld van "The Lord of the Rings".
Met toegang tot een document van 15 pagina's, kan het language model vragen beantwoorden met betrekking tot het document en andere vragen.
Wil je zelf het embedded document aanpassen? 

<img width="651" alt="image" src="https://github.com/user-attachments/assets/451d76e1-df2e-4384-a144-95b89fa9ff29" />

Kan dat hier.

<img width="206" alt="image" src="https://github.com/user-attachments/assets/e6486527-3a0f-4ffe-b2fe-2650ca34e79c" />

Pas de content van lotrintro.txt aan of upload je eigen bestand, vergeet niet te refereren naar het juiste document.

Gebouwd backend gemaakt met Express.js en de Frontend met React!

### Installatie

#### Frontend : 

<img width="357" alt="image" src="https://github.com/user-attachments/assets/8b64bad8-23bf-4f88-a9af-1357e0264130" />

Na het clonen van de repository, map naar client -> frontend en run het volgende command in de terminal `npm install`.
Om de frontend vervolgens te draaien, run het command `npm start`.

<img width="397" alt="image" src="https://github.com/user-attachments/assets/992ae4d3-106b-4cf9-8d9c-4a7dd25aff66" />

### Backend : 

<img width="343" alt="image" src="https://github.com/user-attachments/assets/bab457b1-667b-4450-90cc-3d37993411a0" />

Na het clonen van de repository, map naar server en run het volgende command `npm install`.

<img width="328" alt="image" src="https://github.com/user-attachments/assets/ad1646a3-7e26-43c7-be9e-98e1f05f63e7" />

Om de backend vervolgens te laten draaien, run het command `npm run dev`.

### LLM

<img width="196" alt="image" src="https://github.com/user-attachments/assets/0c37466a-533b-4080-9a43-b6bcdb92b5f1" />


Om gebruik te kunnen maken van het Language Model heb je API keys nodig, deze kunnen worden ingesteld binnen een `.env` bestand, die je zelf aan kan maken in de server map.

`AZURE_OPENAI_API_VERSION=`
`AZURE_OPENAI_API_INSTANCE_NAME=`
`AZURE_OPENAI_API_KEY=` 
`AZURE_OPENAI_API_DEPLOYMENT_NAME=`
`AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=`
`LOTR_API_KEY=`
`HUGGING_FACE=`

Vul de volgende velden aan met je eigen keys, deze keys kan je via `OpenAI` en `HuggingFace` aanvragen na het registreren van een gebruikrs profiel.

In de code zijn twee verschillende LLM's beschikbaar, ze zijn aan te merken aan de comments. Er zijn verschillende `deepseek` modellen beschikbaar (voornamelijk R1 & GPT 3.5 Turbo), uncomment de code binnen de aangegeven lijnen en comment de lijnen van het andere model. Herstart de `server` en refresh de frontend!

<img width="733" alt="image" src="https://github.com/user-attachments/assets/c83cdae4-e199-4e4a-a051-57f5b4bd8e97" />



