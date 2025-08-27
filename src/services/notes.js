const API_URL = "/api/notes";

export async function getAll() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const error = new Error('Failed to fetch notes');
    error.response = res;
    throw error;
  }
  return res.json();
}

export async function create(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const error = new Error('Failed to create note');
    error.response = res;
    throw error;
  }
  return res.json();
}

export async function update(id, note) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const error = new Error('Failed to update note');
    error.response = res;
    throw error;
  }
  return res.json();
}

export async function remove(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = new Error('Failed to delete note');
    error.response = res;
    throw error;
  }
  return res.json();
}
