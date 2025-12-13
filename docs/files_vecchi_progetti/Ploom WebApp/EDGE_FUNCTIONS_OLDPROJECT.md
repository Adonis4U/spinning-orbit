# 🔌 Edge Functions - Vecchio progetto di "AdOniS PlOoM"

## 📋 Panoramica

Le Edge Functions sono funzioni serverless eseguite su Supabase Edge Runtime (Deno). Permettono di eseguire logica backend sicura.

**Directory**: `supabase/functions/`

---

## 📁 Struttura

```
supabase/functions/
├── _shared/
│   └── cors.ts          # Headers CORS condivisi
└── create-user/
    └── index.ts         # Funzione creazione utenti
```

---

## 🔧 Funzioni Disponibili

### 1. `create-user`

**Scopo**: Creare nuovi utenti con ruolo specifico. Solo gli admin possono utilizzarla.

**Endpoint**: `POST /functions/v1/create-user`

**Headers Richiesti**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body**:
```json
{
  "email": "utente@example.com",
  "password": "password123",
  "full_name": "Mario Rossi",
  "username": "mrossi",
  "role": "special_user"
}
```

**Ruoli Disponibili**:
- `admin` - Amministratore completo
- `special_user` - Utente con permessi limitati
- `super_ambassador` - Ambassador con accesso proprio

**Risposte**:

✅ **200 - Successo**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "utente@example.com",
    ...
  }
}
```

❌ **401 - Non autorizzato**:
```json
{
  "error": "Non autorizzato"
}
```

❌ **403 - Forbidden (non admin)**:
```json
{
  "error": "Solo gli admin possono creare utenti"
}
```

❌ **400 - Bad Request**:
```json
{
  "error": "Email e password obbligatori"
}
```

**Codice Sorgente**:
```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // Verify requesting user is admin
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Non autorizzato' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Check admin role
    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Solo gli admin possono creare utenti' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    // Get request body
    const { email, password, full_name, username, role } = await req.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email e password obbligatori' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || '', username: username || '' }
    })

    if (createError) {
      return new Response(
        JSON.stringify({ error: createError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Assign role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({ user_id: newUser.user.id, role: role || 'special_user' })

    if (roleError) {
      return new Response(
        JSON.stringify({ error: 'Utente creato ma errore nell\'assegnazione ruolo: ' + roleError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, user: newUser.user }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
```

---

## 📦 Shared Module: CORS

**File**: `supabase/functions/_shared/cors.ts`

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

**Utilizzo**: Importato in tutte le funzioni per gestire CORS.

---

## 🔐 Secrets Configurati

| Nome | Descrizione | Auto-generato |
|------|-------------|---------------|
| `SUPABASE_URL` | URL progetto Supabase | ✅ |
| `SUPABASE_ANON_KEY` | Chiave pubblica | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Chiave admin | ✅ |
| `SUPABASE_DB_URL` | URL database | ✅ |

---

## 🚀 Deployment

Le Edge Functions vengono deployate automaticamente quando:
1. Si committa su GitHub (se connesso)
2. Si usa il tool di deployment Lovable
3. Si usa la CLI Supabase

**Deploy manuale**:
```bash
supabase functions deploy create-user
```

---

## 📊 Monitoring

I log delle Edge Functions sono disponibili su:
- **Supabase Dashboard**: Project → Functions → Logs
- **Link diretto**: https://supabase.com/dashboard/project/qaubntftkezeqfsnhxha/functions/create-user/logs

---

## 🔮 Funzioni Future Proposte

### `send-notification`
Inviare notifiche push/email agli utenti.

### `generate-report`
Generare report PDF lato server.

### `sync-data`
Sincronizzare dati con servizi esterni.

### `cleanup-old-data`
Job schedulato per pulizia dati vecchi.

### `webhook-handler`
Gestire webhook da servizi esterni.

---

## 📚 Best Practices

1. **Sempre verificare autenticazione** prima di operazioni sensibili
2. **Usare `SUPABASE_SERVICE_ROLE_KEY`** solo per operazioni admin
3. **Gestire CORS** per chiamate browser
4. **Loggare errori** per debugging
5. **Validare input** sempre lato server
6. **Timeout**: Le funzioni hanno un timeout di 60s (max)

---

## 🔗 Risorse

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Deploy](https://deno.com/deploy)
- [TypeScript Deno](https://deno.land/manual/typescript)

---

*Edge Functions - Versione 1.0*
