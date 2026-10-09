import re
import os

files = [
    r"d:\New folder (3)\llm-arena\site\src\App.tsx",
    r"d:\New folder (3)\llm-arena\site\src\LlmRace.tsx"
]

new_function = """const getProviderLogo = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('anthropic')) return '/logos/claude.png';
  if (lowerName.includes('openai')) return '/logos/openai.svg';
  if (lowerName.includes('google')) return '/logos/google.svg';
  if (lowerName.includes('meta')) return '/logos/meta.svg';
  if (lowerName.includes('xai') || lowerName.includes('x-ai') || lowerName.includes('spacexai')) return '/logos/xai.svg';
  if (lowerName.includes('deepseek')) return '/logos/deepseek.svg';
  if (lowerName.includes('moonshot')) return '/logos/kimi.png';
  if (lowerName.includes('zhipu')) return '/logos/zhipu.png';
  if (lowerName.includes('zai') || lowerName.includes('z ai') || lowerName.includes('glm')) return '/logos/glm.png';
  if (lowerName.includes('alibaba') || lowerName.includes('qwen')) return '/logos/qwen.svg';
  if (lowerName.includes('mistral')) return '/logos/mistral.svg';
  if (lowerName.includes('microsoft')) return '/logos/microsoft.svg';
  if (lowerName.includes('amazon') || lowerName.includes('aws')) return '/logos/aws.svg';
  if (lowerName.includes('perplexity')) return '/logos/perplexity.svg';
  if (lowerName.includes('inclusionai')) return '/logos/inclusionai_small.webp';
  if (lowerName.includes('primalabs') || lowerName.includes('prima')) return '/logos/primalabs.svg';
  if (lowerName.includes('ollama')) return '/logos/ollama.svg';
  if (lowerName.includes('hugging')) return '/logos/huggingface.svg';
  if (lowerName.includes('ibm') || lowerName.includes('granite')) return '/logos/ibm.png';
  if (lowerName.includes('cohere')) return '/logos/cohere.png';
  if (lowerName.includes('celeris')) return '/logos/celeris.png';
  if (lowerName.includes('mercury')) return '/logos/mercury.png';
  if (lowerName.includes('liquid')) return '/logos/liquid.png';
  if (lowerName.includes('stepfun')) return '/logos/stepfun.png';
  if (lowerName.includes('minimax')) return '/logos/minimax.png';
  if (lowerName.includes('servicenow')) return '/logos/servicenow.png';
  if (lowerName.includes('reka')) return '/logos/reka.png';
  if (lowerName.includes('naver')) return '/logos/naver.png';
  if (lowerName.includes('upstage')) return '/logos/upstage.png';
  if (lowerName.includes('tencent')) return '/logos/tencent.png';
  if (lowerName.includes('baidu')) return '/logos/baidu.png';
  if (lowerName.includes('xiaomi')) return '/logos/xiaomi.png';
  if (lowerName.includes('ai21') || lowerName.includes('jt') || lowerName.includes('flash 236b') || lowerName.includes('jamba')) return '/logos/ai21.png';
  if (lowerName.includes('sk telecom') || lowerName.includes('kt')) return '/logos/sktelecom.png';
  if (lowerName.includes('sarvam')) return '/logos/sarvam.png';

  if (lowerName.includes('ai9stars')) return '/logos/ai9stars.png';
  if (lowerName.includes('allen')) return '/logos/allenai.png';
  if (lowerName.includes('apodex')) return '/logos/apodex.png';
  if (lowerName.includes('arcee')) return '/logos/arcee.png';
  if (lowerName.includes('bytedance') || lowerName.includes('seed') || lowerName.includes('doubao') || lowerName.includes('dubao')) return '/logos/doubao.png';
  if (lowerName.includes('china mobile')) return '/logos/chinamobile.png';
  if (lowerName.includes('deep cogito')) return '/logos/deepcogito.png';
  if (lowerName.includes('inception')) return '/logos/inception.png';
  if (lowerName.includes('institute of foundation')) return '/logos/ifm.png';
  if (lowerName.includes('kwaikat') || lowerName.includes('kuaishou')) return '/logos/kuaishou.png';
  if (lowerName.includes('lg ai')) return '/logos/lgai.png';
  if (lowerName.includes('longcat')) return '/logos/longcat.png';
  if (lowerName.includes('motif')) return '/logos/motif.png';
  if (lowerName.includes('multiverse')) return '/logos/multiverse.png';
  if (lowerName.includes('nvidia')) return '/logos/nvidia.png';
  if (lowerName.includes('nanbeige')) return '/logos/nanbeige.png';
  if (lowerName.includes('nex')) return '/logos/nexagi.png';
  if (lowerName.includes('nous')) return '/logos/nous.png';
  if (lowerName.includes('openbmb')) return '/logos/openbmb.png';
  if (lowerName.includes('prime')) return '/logos/primeintellect.png';
  if (lowerName.includes('swiss ai')) return '/logos/swissai.png';
  if (lowerName.includes('tii uae') || lowerName.includes('tii')) return '/logos/tii.png';
  if (lowerName.includes('thinking machines')) return '/logos/thinkingmachines.png';
  if (lowerName.includes('trillion')) return '/logos/trillion.png';
  if (lowerName.includes('spartus') || lowerName.includes('sparta')) return '/logos/spartus.png';

  // If no exact provider logo matches, return null so we don't render a false logo.
  return '';
}"""

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We will find the getProviderLogo function and replace it.
    # It might be defined as `export const getProviderLogo` or `const getProviderLogo`
    # Let's match from `const getProviderLogo = (name: string) => {` or `export const getProviderLogo`
    # to the first `return '';\n}` or `return null;\n}`
    
    pattern = r"(?:export )?const getProviderLogo =.*?return '(?:.*?)';\n}"
    
    # Let's try a regex matching up to the end of the function block.
    # Because it contains multiple returns, we can just look for the first function that starts with getProviderLogo.
    match = re.search(r"(?:export )?const getProviderLogo = \(name: string\) => \{.*?\n\}", content, re.DOTALL)
    if match:
        replacement = new_function
        if "export const getProviderLogo" in match.group(0):
            replacement = "export " + new_function
        content = content.replace(match.group(0), replacement)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated getProviderLogo in {os.path.basename(file_path)}")
    else:
        print(f"Could not find getProviderLogo in {os.path.basename(file_path)}")
