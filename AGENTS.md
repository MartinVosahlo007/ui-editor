## Git workflow

Codex must work only on the `main` branch.

Codex must not create new branches.

Codex must not commit or push to any branch other than `main`.

Before committing or pushing, Codex must verify the current branch with:

```bash
git branch --show-current
```

## Local Git executable

On this machine, `git` may not be available on `PATH` in Codex shells. Use the installed Git executable directly:

```powershell
& 'C:\Program Files\Git\cmd\git.exe' branch --show-current
```
