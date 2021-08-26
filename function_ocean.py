from os import path
import os.path
# from datetime import datetime as dt
import datetime as dt
import json
import pandas as pd
import numpy as np
import sys
import os
import copy
import os
import glob
# import grasia_dash_components as gdc
# import json
# import jsonify
# import ciso8601
# old_env = os.environ['PATH']
df_return = []

# src = 'C:/Users/Utilisateur/PycharmProjects/montee_en_competence/stat_pop.csv'

src = '/root/data/stat_pop.csv'

df_population=pd.read_csv(src,sep=";")

# couleur(5,98,138)
# 72,145,118 #489176
# # 206,136,87 #ce8857
# 154,80,82 #9a5052
# 160,175,82 #a0af52
# 88,158,157 #589e9d
# 103,120,132 #677884
# 206,182,75 #ceb64b
# 40,72,101 #284865
# 166,135,103 #a68767


from flask import Flask, jsonify,render_template
# from flask_cors import CORS
from flask_cors import CORS, cross_origin
app = Flask(__name__)
# cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# CORS(app, support_credentials=True)
today = dt.date.today().strftime("%m-%d-%Y")
csv_today_path = '/root/data/csv_vaccin/' + today + ".csv"
# csv_today_path = today + ".csv"
if path.exists(csv_today_path):
	df_vaccin_quotidien = pd.read_csv(csv_today_path)

@app.route('/data_europeenne')
@cross_origin()
def data_europenne():
	# https: // opendata.ecdc.europa.eu / covid19 / vaccine_tracker / csv / data.csv
		csv_path = 'C:/Users/Utilisateur/PycharmProjects/montee_en_competence/data_europeenne.csv'
		df=pd.read_csv(csv_path,sep=";")
		ggg="ALL"
		df=df.query('TargetGroup==@ggg')


		# df = df.query('Region==`FR`')


		df=df[df['Region'].isin(['FR','DE','ES','IT','PL','NL'])]
		df.FirstDose=df.FirstDose/df.Population
		df=df[['Region','FirstDose']].groupby(['Region'])['FirstDose'].agg('sum')
		mask = (df.index.str.len() ==2)
		df=df.loc[mask]

		return df.to_json()

@app.route('/req_bar_chart')
@cross_origin()
def req_bar_chart():
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup & vaccin==0')
		df=df[~df.reg.isin([5,6,7,8])]
		def f(qte,y):
			# qte=x['n_cum_dose1']
			# y=x['reg']
			a=df_population.query('id==@y')
			return qte/a['pop']
		gg=pd.Series([])
		gg2 = pd.Series([])

		prout =pd.DataFrame([])
		prout=df[['n_cum_dose1','reg']].apply(lambda x: f(*x),axis=1)
		prout2 = df[['n_cum_dose2', 'reg']].apply(lambda x: f(*x), axis=1)
		for i,x in enumerate(prout.columns):
			gg.at[i]=np.float64(pd.unique(prout[x][prout[x].notna()]))*100

		for i,x in enumerate(prout2.columns):
			gg2.at[i]=np.float64(pd.unique(prout2[x][prout2[x].notna()]))*100

		# df_sortie=df.copy(deep=True)df
		hhh=pd.concat([gg.reset_index(drop=True),gg2.reset_index(drop=True),df.reg.reset_index(drop=True)],axis=1)
		hhh.columns=['n_cum_dose1','n_cum_dose2','reg']
		return hhh.to_json()

		
@app.route('/bilan_par_region_dose1/<reg>')
@cross_origin()
def bilan_par_region(reg):

		# print(region)
		reg=np.int64(reg)
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup & vaccin==0 & reg==@reg')

		pop_reg=df_population.query('id==@reg')
		pop_reg=pop_reg['pop']
		aa=int(df['n_cum_dose1'])/int(pop_reg)

		return str(aa)
		
@app.route('/bilan_par_region_dose2/<reg>')
@cross_origin()
def bilan_par_region2(reg):

		# print(region)
		reg=np.int64(reg)
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup & vaccin==0 & reg==@reg')

		pop_reg=df_population.query('id==@reg')
		pop_reg=pop_reg['pop']
		aa=int(df['n_cum_dose2'])/int(pop_reg)
		return str(aa)
		
@app.route('/somme/<reg>/<vaccin>')
@cross_origin()
def filter_data_somme_quotidien(reg,vaccin):
		# print(type(reg))
		reg=np.int64(reg)
		vaccin=np.int64(vaccin)
		data_return=df_vaccin_quotidien.query('reg==@reg & vaccin==@vaccin')
		lim_inf=data_return.timestamp.min()
		# print(lim_inf)
		return df_vaccin_quotidien.query('reg==@reg & vaccin==@vaccin').to_json()
		
@app.route('/detail/<reg>/<vaccin>')
@cross_origin()
def filter_data_detail(reg,vaccin):
		
		x = reg.split('_')
		jsonString = json.dumps(x)
		query = ' | '.join(['reg=={}'.format(k) for k in x])

		vaccin=np.int64(vaccin)

		df=df_vaccin_detail.query('('+ query +') & vaccin==@vaccin').sort_values(by=['timestamp'])
		return df.to_json()
		# return df.pivot(index=["timestamp", "datetime"],columns='reg', values='n_cum_dose1').to_json()
		
@app.route('/detail2/<reg>/<vaccin>')
@cross_origin()
def filter_data_detail2(reg,vaccin):
		
		# reg=np.int64(reg)
		x = reg.split('_')
		jsonString = json.dumps(x)
		query = ' | '.join(['reg=={}'.format(k) for k in x])

		vaccin=np.int64(vaccin)

		df=df_vaccin_detail.query('('+ query +') & vaccin==@vaccin & nb_jour_semaine==1').sort_values(by=['timestamp'])
		
		return df.pivot(index=["timestamp", "datetime"],columns='reg', values='n_cum_dose1').to_json()
		
@app.route('/detail3/<reg>/<vaccin>/<date1>/<date2>')
@cross_origin()
def filter_data_detail3(reg,vaccin,date1,date2):
		
		# reg=np.int64(reg)
		cond_date=""
		x = reg.split('_')
		bDate=True if len(date1)>1 else False
		jsonString = json.dumps(x)
		
		if (bDate):
			cond_date=" & datetime==@date1 & datetime==@date2"
			print("tt")
			
		query = ' | '.join(['reg=={}'.format(k) for k in x])
		
		vaccin=np.int64(vaccin)
		
		df=df_vaccin_detail.query('('+ query +') & vaccin==@vaccin').sort_values(by=['timestamp'])# & nb_jour_semaine==1
		
		#!!!!!!! impossible de mettre datetime dans query
		if (bDate):
			lim_inf=df[df['datetime']==date1].timestamp
			lim_sup=df[df['datetime']==date2].timestamp
			lim_inf=lim_inf.values[0]
			
			if len(lim_sup.index)==0:
				print("rrrr",df.timestamp.iloc[-1])
				# lim_sup=df.timestamp[-1].values[0]
				lim_sup=1630364400
				lim_sup=df.timestamp.iloc[-1]
			else:
				lim_sup=lim_sup.values[0]
			
		df=df.query('nb_jour_semaine==1');
		
		if (bDate):
			df=df.query("timestamp<=@lim_sup & timestamp>=@lim_inf");
			
		df=df.query('nb_jour_semaine==1');
		print(len(df.index))
		return df.pivot(index=["timestamp", "datetime"],columns='reg', values='n_cum_dose1').to_json()
		
@app.route('/lim_detail')
@cross_origin()
def lim_detaill():

		lim_inf=df_vaccin_detail.timestamp.min()
		lim_sup=df_vaccin_detail.timestamp.max()

		return {'lim_inf':lim_inf,'lim_sup':lim_sup}
		
@app.route('/bilan_par_vaccin')
@cross_origin()
def bilan_par_vaccin():

		print(dt.date.today())
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup')
		dff=df[['n_cum_dose1','vaccin']].groupby(['vaccin'])['n_cum_dose1'].agg('sum')
		print(dff.sum())
		return dff.to_json()

@app.route('/doses_administrees')
@cross_origin()
def doses_administrees():

		print(dt.date.today())
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup')
		dff=df[['n_cum_dose1','vaccin']].groupby(['vaccin'])['n_cum_dose1'].agg('sum')
		print(dff.sum())
		return pd.Series(dff.sum()).to_json()
		

		
@app.route('/pourcentage_pop_vac_som_1')
@cross_origin()
def pourcentage_pop_vac_som_1():

		# print(dt.date.today())
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup')
		df.drop(['reg','n_cum_dose2','timestamp','datetime','jour','nb_jour_semaine'],axis=1,inplace=True)
		dff=df[['n_cum_dose1','vaccin']].groupby(['vaccin'])['n_cum_dose1'].agg('sum')
		# print(df[df.isin({'vaccin': [1,2,3,4]})]['n_cum_dose1'].sum())
		# return df[df.isin({'vaccin': [1,2,3,4]})].to_json()
		# print(dff.sum()/(2*65000000))
		return str(dff.sum()/(2*65000000))
		
@app.route('/pourcentage_pop_vac_som_2')
@cross_origin()
def pourcentage_pop_vac_som_2():

		# print(dt.date.today())
		lim_sup=df_vaccin_detail.timestamp.max()
		df=df_vaccin_detail.query('timestamp==@lim_sup')
		df.drop(['reg','n_cum_dose1','timestamp','datetime','jour','nb_jour_semaine'],axis=1,inplace=True)
		dff=df[['n_cum_dose2','vaccin']].groupby(['vaccin'])['n_cum_dose2'].agg('sum')
		# print(df[df.isin({'vaccin': [1,2,3,4]})]['n_cum_dose1'].sum())
		# return df[df.isin({'vaccin': [1,2,3,4]})].to_json()
		return str(dff.sum()/(2*65000000))
		
@app.route('/liste_mois_detail')
@cross_origin()
def liste_mois_detail():

		df_mois_unique=pd.DataFrame([])
		df_mois_unique=pd.concat([df_vaccin_detail.datetime.apply(lambda x: x[0:7]),df_vaccin_detail.timestamp],axis=1)
		df_mois_unique_first = df_mois_unique.drop_duplicates(subset=['datetime'],keep="first",ignore_index=True)
		# premier_jour_moi_suivant=pd.Series()
		# df_mois_unique_last =df_mois_unique_last.append(df_mois_unique_first.iloc[1],ignore_index=True)
		# print("yyyffff",pd.Series(df_mois_unique_first.iloc[-1].timestamp+2592000))
		# print("yyyffff",str(int(df_mois_unique_first.iloc[-1].datetime[-1])+1))
		data=[[df_mois_unique_first.iloc[-1].timestamp+2592000,
		df_mois_unique_first.iloc[-1].datetime[:-1] + str(int(df_mois_unique_first.iloc[-1].datetime[-1])+1)]]
		
		dff = pd.DataFrame(data, columns = ['timestamp', 'datetime'])
		print(dff)
		
		df_mois_unique_first =pd.concat([df_mois_unique_first,dff],ignore_index=True)
		# on prend pas en compte les derniers jours de décembre 2020
		return df_mois_unique_first[1:].to_json()
		
@app.route("/")
@cross_origin()
def helloWorld():
  return "Hello, cross-origin-world!"
	
@app.route('/color')
@cross_origin()
def choose_color(i):
	color_list = ["#489176", "#ce8857", "#9a5052", "#a0af52", " #589e9d", "#677884", "#ceb64b", "#284865", "#a68767"]
	if i>=len(color_list):
		return color_list[len(color_list)-i]
	else:
		return color_list[i]
# liste_des_vaccins
df_liste_vaccin = ["Tous","COMIRNATY Pfizer/BioNTech", "Moderna", "AstraZeneka"]
# print(df_liste_vaccin)
# CHargement liste des régions

# bilan des données actuelle
# Le fichier est mis à jour quotidiennement et il comprend la somme par région et par vaccin. Cependant pour certaines
# régions et vaccins,la valeur peut manquer à un jour donné. On créee donc un fichier à jour cumulant les données
# de la journée selon data-france et celles données par data-fr&ance il y a pluysieurs jours pour les valeurs manquantes

# date_min=dt.datetime.strptime("27/12/2020","%d/%m/%Y").timestamp()
# date_max=dt.datetime.timestamp(dt.datetime.today()-dt.timedelta(days=1))
# print(date_min)

labels = ["A1", "A2", "A3", "A4", "A5", "B1", "B2"]
parents = ["", "", "", "", "", "", ""]
values = ["11", "12", "13", "14", "15", "20", "30"]


# somme des datas par jour même incomplète pour pouvoir viusaliser les changements depuis lavaeille
#dans df_vaccin_detail on peut avoir des journées manquantes
@app.route('/b')
def make_vaccin_detail():
	today = dt.date.today().strftime("%m-%d-%Y")
	# csv_today_path = 'C:/Users/Utilisateur/PycharmProjects/montee_en_competence/csv_vaccin_detail/' + today + ".csv"
	csv_today_path = '/root/data/csv_vaccin_detail/' + today + ".csv"
	if path.exists(csv_today_path):
		return pd.read_csv(csv_today_path)
	else:
		src = 'https://www.data.gouv.fr/fr/datasets/r/900da9b0-8987-4ba7-b117-7aea0e53f530'
		df_vaccin_detail = pd.read_csv(src, sep=";")
		# print(df_vaccin_detail.dtypes)
		
		df_vaccin_detail['datetime']=pd.to_datetime(df_vaccin_detail['jour'], format='%Y-%m-%d')
		df_vaccin_detail['nb_jour_semaine']=pd.to_datetime(df_vaccin_detail['jour'], format='%Y-%m-%d').dt.dayofweek
		df_vaccin_detail['timestamp']=df_vaccin_detail['datetime'].apply(lambda x: dt.datetime.timestamp(x))
		# print(df_vaccin_detail.dtypes)
		# df_vaccin_detail['somme_jour_vaccin'] = df_vaccin_detail.groupby(['jour', 'vaccin'])['n_cum_dose1'].transform(
		# 	sum)
		df_vaccin_detail.to_csv(csv_today_path)
	
		return df_vaccin_detail
	#le seul truc qui nous manque c'est le cumul par jour par vaccin sur toutes les régions

df_vaccin_detail=make_vaccin_detail() 



# ratio de pop vacciné
@app.route('/f')
def ratio():
	df_vaccin_quotidien['somme_jour'] = df_vaccin_quotidien.groupby(['reg', 'jour'])[
		'n_dose1'].transform(sum)

	population_totale = 65000000

	pop_totale_vacciné = population_totale / df_vaccin_quotidien["n_dose1"].sum()
	liste_vaccin = pd.unique(df_vaccin_quotidien["vaccin"])

	# df_vaccin_quotidien['reg'] = df_vaccin_quotidien['reg'].apply(lambda x: x.zfill(2))
	# df_vaccin_quotidien['reg']=df_vaccin_quotidien['reg'].astype("string")

	df_tot = df_population.merge(df_vaccin_quotidien, left_on='id', right_on='reg')

	df_tot = df_tot.query('vaccin==0')  # vaccin=0 somme des vaccins

	df_tot["ratio"] = 100 * (df_tot["n_cum_dose1"] / df_tot["pop"])
	df_tot["ratio_dose_2"] = 100 * \
							 (df_tot["n_cum_dose1"] + df_tot["n_cum_dose2"]) / df_tot["pop"]
							 
	return df_tot


					

@app.route('/g')
def load_geojson():
	with open('C:/Users/Utilisateur/PycharmProjects/montee_en_competence/france_geojson.json') as f:
		geojson = json.load(f)

	for i, x in enumerate(geojson["features"]):
		df.append([x["properties"]["code"], x["properties"]
		["nom"], "pink", x["properties"]["code"]])

	df = pd.DataFrame(df, columns=['code', 'nom', 'color', 'custom_data'])
	# df.astype({'id': 'int'}).dtypes
	df["code"] = df["code"].astype(np.int64)
	# df['code'] = df['code'].apply(lambda x: x.zfill(2))
	df_tot=ratio()
	df = df.merge(df_tot, left_on='code', right_on='reg')



if __name__=='__main__':
    app.run(host='0.0.0.0',port='8052',debug=True)
