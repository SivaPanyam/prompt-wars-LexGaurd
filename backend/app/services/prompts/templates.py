PARSER_PROMPT = """
You are an expert legal document parser. 
I will provide you with the raw text of a legal contract.
Your task is to break this document down into distinct legal clauses.
Ignore table of contents, page numbers, and formatting noise.

RAW DOCUMENT TEXT:
{document_text}

Extract each clause. Provide a unique ID (e.g. "clause_1") and the exact original text.
"""

CLASSIFIER_PROMPT = """
You are a legal categorization expert.
Given the following legal clause, identify its core legal category (e.g., Indemnification, Liability Cap, Termination, Governing Law, Data Privacy, Confidentiality, IP Rights).
Also determine if it appears to be a standard boilerplate clause or heavily customized (is_standard: true/false).

CLAUSE TEXT:
{clause_text}
"""

RISK_PROMPT = """
You are a conservative corporate lawyer reviewing a contract on behalf of your client.
Review the following classified clause and assess its risk severity to your client.
Severity must be one of: safe, moderate, high, critical.
List the specific risk_drivers that justify this score.

CATEGORY: {category}
CLAUSE TEXT:
{clause_text}
"""

CONSEQUENCE_PROMPT = """
You are a business risk strategist.
Given a high-risk legal clause, simulate the worst-case real-world consequences if this clause is triggered.
Be specific about business impact and financial exposure.

CLAUSE TEXT:
{clause_text}
"""

NEGOTIATION_PROMPT = """
You are a master negotiator.
The client has received a contract with a high-risk clause. 
Provide a specific redline suggestion (exact text to replace it with), an explanation for the counter-party, and a fallback position if they reject the redline.

CLAUSE TEXT:
{clause_text}
"""

EXPLAINABILITY_PROMPT = """
You are an expert at translating dense legalese into plain English.
Translate this clause into a simple summary that a non-lawyer CEO would understand immediately.
List the key takeaways.

CLAUSE TEXT:
{clause_text}
"""
