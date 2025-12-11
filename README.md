# Plan d'Implémentation - Athena (Stack Symfony/Docker)

## 1. Stack Technique & Infrastructure
- **Framework**: Symfony 7 (Dernière version stable).
- **Serveur**: Docker Compose complet.
    - `nginx`: Serveur Web.
    - `php-fpm`: PHP 8.2+ avec extensions requises.
    - `mysql`: MySQL 8.0.
    - `pma`: phpMyAdmin (facultatif, pour debug).
- **Frontend**:
    - **Bootstrap 5**: Framework CSS (thème "Premium").
    - **Twig**: Moteur de template.
    - **UX**: `stimulus` pour le JS léger, `easy-mde` pour l'éditeur Markdown.
- **Intelligence Artificielle**:
    - **Gemini API (v3)**: Pour l'analyse de texte et l'enrichissement de données ("Magic Form").
- **PWA**:
    - Manifest.json et Service Worker pour les notifications et le fonctionnement "App".

## 2. Authentification & Sécurité
- **Google SSO (OAuth2)** :
    - Utilisation de `knpuniversity/oauth2-client-bundle`.
    - **Whitelist** : Le système n'accepte la connexion QUE si l'email Google existe déjà dans la table `User` locale.
    - *Pas de mot de passe stocké localement.*
- **API Tokens** :
    - Gestion de tokens personnels (Bearer) pour l'usage externe (Make, n8n...).
    - Interface d'administration pour créer/nommer/révoquer ces tokens.

## 3. Architecture CRM & Intelligence Artificielle

### "Magic Form" (Saisie Assistée par IA)
- **Concept** : Un champ texte unique pour coller des infos en vrac (mail, note, conversation).
- **Processus** :
    1. Envoi à Gemini.
    2. Prompt : *"Extrait les données structurées. Si incomplet, recherche sur le Web (SIRET, Adresse, LinkedIn)."*
    3. Gemini retourne un JSON complet.
    4. Création/Mise à jour des entités `CommercialRelation` et `Contact`.
- **Aide à la saisie** : Bouton "Assistant IA" sur tous les formulaires pour reformuler/compléter.

### Entités CRM

#### A. `CommercialRelation` (Le Dossier Business)
Représente une entité avec qui on traite (Entreprise ou Particulier Business).
- **Identité** :
    - `name` (Nom complet / Raison sociale).
    - `type` (Enum: `ORGANIZATION`, `INDIVIDUAL`).
    - `siret`, `tva_intra`.
    - `website`.
- **Adresses** (Google Maps Autocomplete) :
    - `billing_address` (Facturation).
    - `physical_address` (Physique).
- **Statut Commercial** :
    - `sales_status` (Enum: 'Prospect Froid', 'Prospect Tiède', 'Prospect Chaud', 'Client Actif', 'Ancien Client', 'Disqualifié').
    - `relation_types` (Array JSON - Choix multiple : ['Prospect/Client', 'Partenaire', 'Fournisseur', 'ESN', 'Autre']).
    - `last_contact_date` (DateTime).
- **Valeur & Négociation** :
    - `my_benefits` (Mes bénéfices - Markdown).
    - `their_benefits` (Ses bénéfices - Markdown).
    - `comments` (Markdown).
- **Relations** :
    - `contacts` (ManyToMany avec `Contact`). *Un dossier peut avoir plusieurs contacts.*
    - `projects` (OneToMany avec `Project`).

#### B. `Contact` (L'Humain)
Représente une personne physique.
- **Relations** :
    - `commercialRelations` (ManyToMany avec `CommercialRelation`).
    - *Un contact peut être lié à plusieurs dossiers (ex: son employeur + son projet perso).*
- **Identité & Infos** :
    - `firstname`, `lastname`.
    - `birthday` (Date).
    - `email`, `phone` (Format international).
    - `linkedin_url`.
    - `personal_address` (Google Maps).
- **Profil & Bio** :
    - `job_title` (Poste actuel).
    - `hobbies` (Markdown).
    - `bio` (Notes libres - Markdown).
- **Curriculum Vitae (CV)** :
    - **Expériences** (OneToMany `ProfessionalExperience`):
        - `role`, `organization_name`, `start_year`, `end_year`, `description` (Markdown).
    - **Formations** (OneToMany `Education`):
        - `school`, `start_year`, `end_year`, `description` (Markdown).
    - **Compétences** (ManyToMany `Skill`):
        - `name`, `description`.
        - `category` (ManyToOne `SkillCategory` - ex: IA, Dev, NoCode - Gérable en Back-Office).

## 4. Gestion de Projet & Kanban Avancé

### Entités
**`Project`**
- `name`.
- `commercial_relation_id` (Lien vers le client).
- `status`.

**`Task`**
- `title`.
- `description` (Markdown).
- `priority`, `deadline`.
- `status` (Enum Colonnes).
- `project_id`.
- **Détails Avancés** :
    - `acceptance_criteria` (JSON Array - Liste à cocher "Done").
    - `useful_links` (JSON Array - URLs extraites automatiquement de la description par Regex/IA).

### Vue Kanban
- **Colonnes Fixes** :
    1.  **Backlog**
    2.  **Affaires**
    3.  **En cours**
    4.  **A vérifier**
    5.  **Terminé**
- **Fonctionnalités** :
    - Filtrage par Projet (Select box).
    - Drag & Drop (Mise à jour AJAX du statut).

## 5. Planificateur Quotidien & PWA

### Modélisation du Temps
**`DayScenario`** (Journée Type)
- `name` (ex: "Journée Code Intensif", "Journée Admin").
- `items` (Liste ordonnée de blocs).

**`ScenarioItem`** (Bloc de temps)
- `label` (ex: "Deep Work Python").
- `type` (Enum: `WORK`, `BREAK`, `EMAIL`, `WATCH`, `OTHER`).
- `duration_minutes` (Int).
- `order` (Position dans la journée).

**`CalendarEntry`**
- `date` (Date).
- `scenario_id` (Journée type appliquée ce jour-là).

### Interface & PWA
- **Builder** : Interface Drag & Drop pour construire les journées types.
- **Calendrier** : Vue mensuelle pour assigner les scénarios (support de la récurrence).
- **Mode "Run" (Le Compagnon)** :
    - Vue focus sur la tâche en cours.
    - Timer dégressif.
- **Notifications (PWA)** :
    - Utilisation des **Web Notifications API** via Service Worker.
    - **Alerte Sonore + Visuelle** à la fin d'un bloc pour forcer la transition.
    - Fonctionne en arrière-plan (si autorisé par le navigateur/OS).


# Projet Athena - Back-Office Symfony

- [ ] Configuration & Infrastructure (Docker) <!-- id: 0 -->
    - [ ] `docker-compose.yml` (PHP, Nginx, MySQL, PMA) <!-- id: 1 -->
    - [ ] Symfony Skeleton + WebApp <!-- id: 2 -->
    - [ ] Service Client Gemini API <!-- id: 28 -->
- [ ] Authentification & Sécurité <!-- id: 4 -->
    - [ ] Google SSO (OAuth2) - Whitelist <!-- id: 23 -->
    - [ ] Gestion Tokens API <!-- id: 7 -->
- [ ] CRM & Intelligence Artificielle <!-- id: 9 -->
    - [ ] Entités `CommercialRelation` & `Contact` <!-- id: 10 -->
    - [ ] "Magic Form" + Recherche Web (Gemini) <!-- id: 29 -->
    - [ ] CRUDs avec Editeur Markdown <!-- id: 31 -->
- [ ] Gestion de Projet & Kanban <!-- id: 13 -->
    - [ ] Entités `Project` & `Task` (Checklist, Liens) <!-- id: 14 -->
    - [ ] Kanban Board (5 Colonnes) <!-- id: 15 -->
- [ ] Planificateur & PWA <!-- id: 17 -->
    - [ ] Entités `DayScenario` & `ScenarioItem` <!-- id: 18 -->
    - [ ] Interface Builder de Scénarios <!-- id: 19 -->
    - [ ] Calendrier & PWA Notifications (Service Worker) <!-- id: 22 -->
