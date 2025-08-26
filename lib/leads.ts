// Client-side lead submission utility
export async function submitLead(type: string, data: any) {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Lead submission error:', error);
    throw error;
  }
}
