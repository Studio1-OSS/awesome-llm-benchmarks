import os

# New mappings to add:
new_mappings = """
  if (lowerName.includes('ai21')) return '/logos/ai21.png';
  if (lowerName.includes('ai9stars')) return '/logos/ai9stars.png';
  if (lowerName.includes('allen')) return '/logos/allenai.png';
  if (lowerName.includes('apodex')) return '/logos/apodex.png';
  if (lowerName.includes('arcee')) return '/logos/arcee.png';
  if (lowerName.includes('bytedance') || lowerName.includes('seed')) return '/logos/bytedance.png';
  if (lowerName.includes('china mobile')) return '/logos/chinamobile.png';
  if (lowerName.includes('deep cogito')) return '/logos/deepcogito.png';
  if (lowerName.includes('inception')) return '/logos/inception.png';
  if (lowerName.includes('institute of foundation')) return '/logos/ifm.png';
  if (lowerName.includes('korea telecom') || lowerName.includes('kt')) return '/logos/kt.png';
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
"""

def inject_mappings(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We will just insert these lines before `return null;` or `return '';`
    if "return null;" in content:
        content = content.replace("return null;", new_mappings + "  return null;")
    elif "return '';" in content:
        content = content.replace("return '';", new_mappings + "  return '';")
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

inject_mappings(r"d:\New folder (3)\llm-arena\site\src\LlmRace.tsx")
inject_mappings(r"d:\New folder (3)\llm-arena\site\src\App.tsx")

print("Added all missing mappings!")
