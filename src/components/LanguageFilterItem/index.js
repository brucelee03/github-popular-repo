import './index.css'

const LanguageFilterItem = props => {
  const {languageData, onClickLanguageTab, isActive} = props
  const {id, language} = languageData

  const onClickTabItem = () => {
    onClickLanguageTab(id)
  }

  const activeLanguageTab = isActive ? 'active-language-tab' : ''

  return (
    <li className="language-tab-card">
      <button
        type="button"
        className={`tab-btn ${activeLanguageTab}`}
        onClick={onClickTabItem}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
