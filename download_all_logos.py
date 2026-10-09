import urllib.request
import os

domains = {
    'ai21': 'ai21.com',
    'ai9stars': 'ai9stars.com',
    'alibaba': 'alibaba.com',
    'allenai': 'allenai.org',
    'amazon': 'amazon.com',
    'anthropic': 'anthropic.com',
    'apodex': 'apodex.ai',
    'arcee': 'arcee.ai',
    'baidu': 'baidu.com',
    'bytedance': 'bytedance.com',
    'celeris': 'celeris.ai',
    'chinamobile': 'chinamobileltd.com',
    'cohere': 'cohere.com',
    'deepcogito': 'deepcogito.com',
    'deepseek': 'deepseek.com',
    'google': 'google.com',
    'ibm': 'ibm.com',
    'inception': 'inception.ai',
    'ifm': 'ifm.org',
    'kimi': 'moonshot.cn',
    'kt': 'kt.com',
    'kuaishou': 'kuaishou.com',
    'lgai': 'lgresearch.ai',
    'liquid': 'liquid.ai',
    'longcat': 'longcat.ai',
    'meta': 'meta.com',
    'microsoft': 'microsoft.com',
    'minimax': 'minimaxi.com',
    'mistral': 'mistral.ai',
    'motif': 'motif.tech',
    'multiverse': 'multiversecomputing.com',
    'nvidia': 'nvidia.com',
    'nanbeige': 'nanbeige.com',
    'naver': 'naver.com',
    'nexagi': 'nexagi.com',
    'nous': 'nousresearch.com',
    'openai': 'openai.com',
    'openbmb': 'openbmb.org',
    'perplexity': 'perplexity.ai',
    'primeintellect': 'primeintellect.ai',
    'reka': 'reka.ai',
    'sktelecom': 'sktelecom.com',
    'sarvam': 'sarvam.ai',
    'servicenow': 'servicenow.com',
    'spacex': 'spacex.com',
    'stepfun': 'stepfun.com',
    'swissai': 'swissai.org',
    'tii': 'tii.ae',
    'tencent': 'tencent.com',
    'thinkingmachines': 'thinkingmachin.es',
    'trillion': 'trillionlabs.ai',
    'upstage': 'upstage.ai',
    'xiaomi': 'xiaomi.com',
    'zhipu': 'zhipuai.cn',
}

base_url = "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://{domain}&size=128"
save_dir = r"d:\New folder (3)\llm-arena\site\public\logos"

for name, domain in domains.items():
    try:
        url = base_url.format(domain=domain)
        save_path = os.path.join(save_dir, f"{name}.png")
        if not os.path.exists(save_path):  # only download if not already downloaded
            urllib.request.urlretrieve(url, save_path)
            print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
