from utils import OPENAI_API_KEY
from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)

response = client.responses.create(
    model='gpt-4o-mini',
    input='취침시간에 아이에게 들려주를 유니콘에 대한 스토리를 한문장으로 작성해줘'
)

print(response.output_text)